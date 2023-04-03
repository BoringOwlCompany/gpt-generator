import React, { FormEvent } from 'react';
import { Button, NumberInput, TextInput, Combobox, ComboboxOption } from '@strapi/design-system';

import { IUseForm, useForm, useStatus } from '../../../../hooks';
import { ITitleResponse, Language } from '../../../../../../shared';
import { generateApi } from '../../../../api';
import { FormWrapper } from '../../../Global';
import { IForm } from '../AddJobModal/AddJobModal';

interface IProps {
  form: IUseForm<IForm>;
}

const GenerateTitlesForm = ({ form: { state, handleChange, handleValueChange } }: IProps) => {
  const { isError, isLoading, setStatus } = useStatus();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus('loading');

    try {
      const titlesResponse = await generateApi.generateTitles(state);
      setStatus('success');
      handleValueChange(
        'titles',
        titlesResponse.map(({ title }) => title)
      );
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <TextInput
        placeholder="Provide keywords to generate titles"
        label="Keywords"
        name="keywords"
        disabled={isLoading}
        onChange={handleChange}
        value={state.keywords}
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
      <Combobox
        value={state.language}
        label="Language"
        disabled={isLoading}
        onChange={(value: Language) => handleValueChange('language', value)}
      >
        {Object.values(Language).map((lang) => (
          <ComboboxOption key={lang} value={lang}>
            {lang}
          </ComboboxOption>
        ))}
      </Combobox>
      <Button loading={isLoading} disabled={!state.keywords || isLoading} type="submit">
        Submit
      </Button>
    </FormWrapper>
  );
};

export default GenerateTitlesForm;
