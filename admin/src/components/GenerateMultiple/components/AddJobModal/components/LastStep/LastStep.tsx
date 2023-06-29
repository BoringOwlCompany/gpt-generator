import React, { FormEvent, Fragment, useState } from 'react';
import {
  DatePicker,
  DateTimePicker,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  FieldLabel,
} from '@strapi/design-system';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { useStatus } from '../../../../../../hooks';
import { FormWrapper, Select } from '../../../../../Global';

import { cronPossibilities } from './LastStep.config';
import { cronApi } from '../../../../../../api';
import { useCollectionContext } from '../../../../../../context';
import { addMinutesToTime } from './LastStep.utils';
import { IFinalForm, IProps } from './LastStep.types';
import { useLastStep } from './hooks';

const LastStep = ({ initialValues, handleFinish }: IProps) => {
  const { isError, isLoading, setStatus } = useStatus();
  const [dateError, setDateError] = useState<string | null>(null);
  const { collection } = useCollectionContext();
  const { control, watch, setValue } = useFormContext<IFinalForm>();
  const { newJobFields, ItemOptions, GlobalOptions } = useLastStep({ initialValues });
  const { fields, remove } = useFieldArray<IFinalForm>({
    name: 'items',
    control,
  });

  const { firstItemGenerationTime, interval, items } = watch();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (firstItemGenerationTime.getTime() < Date.now()) {
      setDateError('Select date in the future');
      return;
    }

    setDateError(null);
    setStatus('loading');

    try {
      await cronApi.createNewJob({
        language: initialValues.language,
        collection,
        details: {
          ...newJobFields,
          items: items.map((item, index) => ({
            ...item,
            status: 'idle',
            timestamp:
              firstItemGenerationTime.getTime() + addMinutesToTime(parseInt(interval) * index),
          })),
        },
      });

      setStatus('success');
      handleFinish();
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Grid gap={4}>
        <GridItem col={6}>
          <DateTimePicker
            name="firstItemGenerationTime"
            onChange={(e: Date) => setValue('firstItemGenerationTime', e)}
            value={firstItemGenerationTime}
            hint="Select date in the future"
            label="First item generation date"
            clearLabel="Clear"
            error={dateError}
            step={1}
          />
        </GridItem>
        <GridItem col={6}>
          <Select<IFinalForm>
            label="Interval"
            name="interval"
            options={cronPossibilities.map(({ label, value }) => ({
              label,
              value,
            }))}
            disabled={isLoading}
            isError={isError}
          />
        </GridItem>
      </Grid>
      {GlobalOptions && <GlobalOptions disabled={isLoading} />}
      <Divider />
      <Flex
        direction="column"
        alignItems="stretch"
        gap={4}
        padding={4}
        style={{ maxHeight: '300px', overflow: 'auto' }}
      >
        {fields.map(({ id }, index) => {
          return (
            <Fragment key={id}>
              {ItemOptions && <ItemOptions disabled={isLoading} index={index} remove={remove} />}
            </Fragment>
          );
        })}
      </Flex>
      <Button type="submit" loading={isLoading} disabled={isLoading}>
        Submit
      </Button>
    </FormWrapper>
  );
};

export default LastStep;
