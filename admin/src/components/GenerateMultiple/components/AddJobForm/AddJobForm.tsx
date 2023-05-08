import React, { FormEvent, useEffect, useState } from 'react';
import {
  DatePicker,
  TimePicker,
  Icon,
  Button,
  Divider,
  TextInput,
  Select,
  Option,
  Flex,
  Grid,
  GridItem,
  FieldLabel,
  Checkbox,
} from '@strapi/design-system';
import { Cross } from '@strapi/icons';

import { Cron, VideoLength } from '../../../../../../shared';
import { useForm, useStatus, useIndeterminateCheckbox } from '../../../../hooks';
import { FormWrapper, TitleOptions } from '../../../Global';

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
    items: titlesFormState.titles.map((title) => ({
      title,
      image: { isActive: false, prompt: '' },
      videoScript: { isActive: false, length: VideoLength.ONE_MINUTE },
    })),
  });

  const { allImages, allVideoScripts } = useIndeterminateCheckbox({
    allImages: state.items.map((item) => item.image.isActive),
    allVideoScripts: state.items.map((item) => item.videoScript.isActive),
  });

  const setAllImages = (checked: boolean) =>
    setState((prev) => ({
      ...prev,
      items: prev.items.map((item) => ({ ...item, image: { ...item.image, isActive: checked } })),
    }));
  const setAllVideoScripts = (checked: boolean) =>
    setState((prev) => ({
      ...prev,
      items: prev.items.map((item) => ({
        ...item,
        videoScript: { ...item.videoScript, isActive: checked },
      })),
    }));

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
        items: state.items.map((item, index) => ({
          ...item,
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
                step={1}
                onChange={handleTimeChange}
              />
            </Flex>
          </Flex>
        </GridItem>
        <GridItem col={6}>
          <Select
            value={state.interval}
            label="Interval"
            disabled={isLoading}
            error={isError && 'Something went wrong, please try again...'}
            onChange={(value: string) => handleValueChange('interval', value)}
          >
            {cronPossibilities.map(({ label, value }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </GridItem>
      </Grid>
      <Flex gap={2}>
        <Checkbox
          value={allImages === true}
          indeterminate={allImages === 'indeterminate'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAllImages(e.target.checked)}
        >
          Generate all images
        </Checkbox>
        <Checkbox
          value={allVideoScripts === true}
          indeterminate={allVideoScripts === 'indeterminate'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAllVideoScripts(e.target.checked)
          }
        >
          Generate all video scripts
        </Checkbox>
      </Flex>
      <Divider />
      <Flex
        direction="column"
        alignItems="stretch"
        gap={4}
        padding={4}
        style={{ maxHeight: '300px', overflow: 'auto' }}
      >
        {state.items.map(({ title }, index) => {
          now.setTime(
            state.firstArticleGenerationTime.getTime() +
              addMinutesToTime(parseInt(state.interval) * index)
          );
          return (
            <>
              <TextInput
                label={`Title ${index + 1}`}
                name={`items.${index}.title`}
                hint={now.toLocaleString('en', dateFormatOptions)}
                onChange={handleChange}
                value={title}
                disabled={isLoading}
                endAction={
                  <Icon
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setState((prev) => {
                        prev.items.splice(index, 1);
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
              <TitleOptions
                disabled={isLoading}
                imagesOptions={{
                  checkboxValue: state.items[index].image.isActive,
                  checkboxOnChange: (value) =>
                    handleValueChange('items', value, `${index}.image.isActive`),
                  prompt: state.items[index].image.prompt,
                  promptInputName: `items.${index}.image.prompt`,
                  promptOnChange: handleChange,
                }}
                videoScriptOptions={{
                  checkboxValue: state.items[index].videoScript.isActive,
                  checkboxOnChange: (value) =>
                    handleValueChange('items', value, `${index}.videoScript.isActive`),
                  length: state.items[index].videoScript.length,
                  lengthOnChange: (value) =>
                    handleValueChange('items', value, `${index}.videoScript.length`),
                }}
              />
            </>
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
  date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5);
  return date;
};

export default AddJobForm;
