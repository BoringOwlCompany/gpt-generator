import React, { FormEvent, Fragment, useState } from 'react';
import {
  DatePicker,
  TimePicker,
  Icon,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  FieldLabel,
} from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { useStatus } from '../../../../../../hooks';
import { FormWrapper, Select, TextInput } from '../../../../../Global';

import { cronPossibilities } from './LastStep.config';
import { cronApi } from '../../../../../../api';
import { dateFormatOptions } from '../../../../../../utils';
import { useCollectionContext } from '../../../../../../context';
import { addMinutesToTime } from './LastStep.utils';
import { IFinalForm, IProps } from './LastStep.types';
import { useLastStep } from './hooks';

const LastStep = ({ initialValues, handleFinish }: IProps) => {
  const { isError, isLoading, setStatus } = useStatus();
  const [dateError, setDateError] = useState('');
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

    setDateError('');
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

  const timeValue = firstItemGenerationTime
    ? `${firstItemGenerationTime.getHours()}:${firstItemGenerationTime.getMinutes()}:${firstItemGenerationTime.getSeconds()}`
    : undefined;

  const handleTimeChange = (time: string) => {
    const dateToSet = firstItemGenerationTime ? new Date(firstItemGenerationTime) : new Date();
    const [hours, minutes] = time.split(':');
    dateToSet.setHours(parseInt(hours, 10));
    dateToSet.setMinutes(parseInt(minutes, 10));

    setValue('firstItemGenerationTime', dateToSet);
  };

  console.log(items);

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Grid gap={4}>
        <GridItem col={6}>
          <Flex gap={1} direction="column" alignItems="start">
            <FieldLabel>First item generation date</FieldLabel>
            <Flex gap={2} alignItems="start">
              <DatePicker
                ariaLabel="First item generation date"
                name="firstItemGenerationTime"
                onChange={(e: Date) => setValue('firstItemGenerationTime', e)}
                clearLabel="Clear"
                selectedDate={firstItemGenerationTime}
                hint="Select date in the future"
                error={dateError}
              />
              <TimePicker
                error={dateError && ' '}
                ariaLabel="time"
                value={timeValue}
                step={1}
                onChange={handleTimeChange}
              />
            </Flex>
          </Flex>
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
        {items.map(({ title }, index) => {
          return (
            <Fragment key={title}>
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
