import React, { FormEvent, useState } from 'react';
import {
  DatePicker,
  TimePicker,
  Icon,
  Button,
  Divider,
  TextInput,
  Combobox,
  ComboboxOption,
  Flex,
  Grid,
  GridItem,
  FieldLabel,
} from '@strapi/design-system';
import { Cross } from '@strapi/icons';

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

const addMinutesToTime = (minutes: number) => 1000 * 60 * minutes;

const AddJobForm = ({ titlesFormState, handleFinish }: IProps) => {
  const { isError, isLoading, setStatus } = useStatus();
  const [dateError, setDateError] = useState('');
  const { state, setState, handleChange, handleValueChange } = useForm({
    firstArticleGenerationTime: getRoundedHour(),
    interval: Cron.ONE_HOUR,
    titles: titlesFormState.titles,
  });

  const now = new Date();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (state.firstArticleGenerationTime.getTime() < Date.now()) {
      setDateError('Select date in the future');
      return;
    }

    setDateError('');
    setStatus('loading');

    try {
      await cronApi.createNewJob({
        ...titlesFormState,
        titles: state.titles.map((title, index) => ({
          title,
          timestamp:
            state.firstArticleGenerationTime.getTime() +
            addMinutesToTime(parseInt(state.interval) * index),
        })),
      });

      setStatus('success');
      handleFinish();
    } catch (e) {
      setStatus('error');
    }
  };

  const timeValue = state.firstArticleGenerationTime
    ? `${state.firstArticleGenerationTime.getHours()}:${state.firstArticleGenerationTime.getMinutes()}:${state.firstArticleGenerationTime.getSeconds()}`
    : undefined;

  const handleTimeChange = (time: string) => {
    const dateToSet = state.firstArticleGenerationTime
      ? new Date(state.firstArticleGenerationTime)
      : new Date();
    const [hours, minutes] = time.split(':');
    dateToSet.setHours(parseInt(hours, 10));
    dateToSet.setMinutes(parseInt(minutes, 10));

    handleValueChange('firstArticleGenerationTime', dateToSet);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Grid gap={4}>
        <GridItem col={6}>
          <Flex gap={1} direction="column" alignItems="start">
            <FieldLabel>First article generation date</FieldLabel>
            <Flex gap={2} alignItems="start">
              <DatePicker
                ariaLabel="First article generation date"
                name="firstArticleGenerationTime"
                onChange={(e: Date) => handleValueChange('firstArticleGenerationTime', e)}
                clearLabel="Clear"
                selectedDate={state.firstArticleGenerationTime}
                hint="Select date in the future"
                error={dateError}
                selectedDateLabel={() => `Date picker, current is `}
              />
              <TimePicker
                error={dateError && ' '}
                ariaLabel="time"
                value={timeValue}
                step={60}
                onChange={handleTimeChange}
              />
            </Flex>
          </Flex>
        </GridItem>
        <GridItem col={6}>
          <Combobox
            value={state.interval}
            label="Interval"
            disabled={isLoading}
            error={isError && 'Something went wrong, please try again...'}
            onChange={(value: string) => handleValueChange('interval', value)}
          >
            {cronPossibilities.map(({ label, value }) => (
              <ComboboxOption key={value} value={value}>
                {label}
              </ComboboxOption>
            ))}
          </Combobox>
        </GridItem>
      </Grid>
      <Divider />
      <Flex
        direction="column"
        alignItems="stretch"
        gap={4}
        padding={4}
        style={{ maxHeight: '300px', overflow: 'auto' }}
      >
        {state.titles.map((title, index) => {
          now.setTime(
            state.firstArticleGenerationTime.getTime() +
              addMinutesToTime(parseInt(state.interval) * index)
          );
          return (
            <TextInput
              label={`Title ${index + 1}`}
              name={`titles.${index}`}
              hint={now.toLocaleString('en', dateFormatOptions)}
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
      </Flex>
      <Button type="submit" loading={isLoading} disabled={isLoading}>
        Submit
      </Button>
    </FormWrapper>
  );
};

const getRoundedHour = () => {
  const date = new Date();
  date.setHours(date.getHours() + Math.ceil(date.getMinutes() / 60));
  date.setMinutes(0, 0, 0);
  return date;
};

export default AddJobForm;
