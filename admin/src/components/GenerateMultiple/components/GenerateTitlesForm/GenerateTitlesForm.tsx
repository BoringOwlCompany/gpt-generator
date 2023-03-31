import React, { FormEvent } from 'react';
import { Button, NumberInput, TextInput, Combobox, ComboboxOption } from '@strapi/design-system';

import * as S from './GenerateTitlesForm.styled';
import { useForm, useStatus } from '../../../../hooks';
import { ITitleResponse, Language } from '../../../../../../shared';
import { api } from '../../../../api';

interface IProps {
  setTitles: (titles: ITitleResponse[]) => void;
}

const GenerateTitlesForm = ({ setTitles }: IProps) => {
  const { isError, isLoading, setStatus } = useStatus();
  const { state, handleChange, handleValueChange } = useForm({
    keywords: '',
    numberOfTitles: 5,
    language: Language.PL,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus('loading');

    try {
      const titlesResponse = await api.generateTitles(state);
      setStatus('success');
      setTitles(titlesResponse);
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
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
    </S.Form>
  );
};

export default GenerateTitlesForm;
