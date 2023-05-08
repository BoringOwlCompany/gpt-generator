import React, { FormEvent } from 'react';
import { Button, NumberInput, TextInput, Select, Option } from '@strapi/design-system';

import { IUseForm, useGpt } from '../../../../hooks';
import { Constant, Language } from '../../../../../../shared';
import { AbsoluteProgress, FormWrapper } from '../../../Global';
import { IForm } from '../AddJobModal/AddJobModal';

interface IProps {
  form: IUseForm<IForm>;
}

const GenerateTitlesForm = ({ form: { state, handleChange, handleValueChange } }: IProps) => {
  const { isError, isLoading, statusMessage, progress, generateTitles } = useGpt();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const titlesResponse = await generateTitles(state);

    if (!titlesResponse) return;

    handleValueChange(
      'titles',
      titlesResponse.map(({ title }) => title)
    );
  };

  return (
    <>
      <AbsoluteProgress
        show={isLoading}
        max={Math.floor(state.numberOfTitles / Constant.TITLES_TO_GENERATE_PER_REQUEST)}
        value={progress}
      />
      <FormWrapper onSubmit={handleSubmit}>
        <TextInput
          placeholder="Provide keywords to generate titles"
          label="Keywords"
          name="keywords"
          disabled={isLoading}
          onChange={handleChange}
          value={state.keywords}
          hint={statusMessage}
          error={isError && 'Something went wrong, please try again...'}
        />
        <NumberInput
          placeholder="Number of titles"
          label="Number of titles"
          name="numberOfTitles"
          disabled={isLoading}
          onValueChange={(value: number) => handleValueChange('numberOfTitles', value)}
          value={state.numberOfTitles}
          min={1}
          max={10}
        />
        <Select
          value={state.language}
          label="Language"
          disabled={isLoading}
          onChange={(value: Language) => handleValueChange('language', value)}
        >
          {Object.values(Language).map((lang) => (
            <Option key={lang} value={lang}>
              {lang}
            </Option>
          ))}
        </Select>
        <Button loading={isLoading} disabled={!state.keywords || isLoading} type="submit">
          Submit
        </Button>
      </FormWrapper>
    </>
  );
};

export default GenerateTitlesForm;
