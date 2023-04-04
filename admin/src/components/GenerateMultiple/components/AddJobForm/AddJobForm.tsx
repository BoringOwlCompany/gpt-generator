import React, { FormEvent } from 'react';
import {
  Alert,
  Icon,
  Button,
  Divider,
  TextInput,
  Combobox,
  ComboboxOption,
} from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import parser from 'cron-parser';

import { Cron } from '../../../../../../shared';
import { useForm, useStatus } from '../../../../hooks';
import { FormWrapper } from '../../../Global';

import { cronPossibilities } from './AddJobForm.config';
import { IForm } from '../AddJobModal/AddJobModal';
import { cronApi } from '../../../../api';
import { dateFormatOptions } from '../../../../utils';

interface IProps {
  titlesFormState: IForm;
  handleFinish: () => void;
}

const addHoursToTime = (hours: number) => 1000 * 60 * 60 * hours;

const AddJobForm = ({ titlesFormState, handleFinish }: IProps) => {
  const { isError, isLoading, setStatus } = useStatus();
  const { state, setState, handleChange, handleValueChange } = useForm({
    cron: Cron.ONE_HOUR,
    titles: titlesFormState.titles,
  });

  const oneHourInterval = parser.parseExpression('0 * * * *');
  const oneHourNextRun = oneHourInterval.next().toDate();

  const date = new Date();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setStatus('loading');

    try {
      await cronApi.createNewJob({
        ...titlesFormState,
        titles: state.titles.map((title, index) => ({
          title,
          timestamp: oneHourNextRun.getTime() + addHoursToTime(parseInt(state.cron) * index),
        })),
      });

      setStatus('success');
      handleFinish();
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Combobox
        value={state.cron}
        label="Interval"
        disabled={isLoading}
        error={isError && 'Something went wrong, please try again...'}
        onChange={(value: string) => handleValueChange('cron', value)}
      >
        {cronPossibilities.map(({ label, value }) => (
          <ComboboxOption key={value} value={value}>
            {label}
          </ComboboxOption>
        ))}
      </Combobox>
      <Divider />
      {state.titles.map((title, index) => {
        date.setTime(oneHourNextRun.getTime() + addHoursToTime(parseInt(state.cron) * index));
        return (
          <TextInput
            label={`Title ${index + 1}`}
            name={`titles.${index}`}
            hint={date.toLocaleString('en', dateFormatOptions)}
            onChange={handleChange}
            value={title}
            disabled={isLoading}
            endAction={
              <Icon
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setState((prev) => {
                    prev.titles.splice(index, 1);
                    return { ...prev };
                  })
                }
                as={Cross}
                colors={(theme: any) => ({
                  path: {
                    fill: theme.colors.danger600,
                  },
                })}
              />
            }
          />
        );
      })}
      <Button type="submit" loading={isLoading} disabled={isLoading}>
        Submit
      </Button>
    </FormWrapper>
  );
};

export default AddJobForm;
