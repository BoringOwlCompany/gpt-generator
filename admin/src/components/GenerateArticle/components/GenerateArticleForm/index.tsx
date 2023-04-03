import React, { useState, type ChangeEvent, FormEvent } from 'react';
import {
  ModalBody,
  Button,
  Checkbox,
  TextInput,
  Combobox,
  ComboboxOption,
} from '@strapi/design-system';
import { useGpt } from '../../../../hooks';
import { IGeneratedArticleResponse, Language } from '../../../../../../shared';

import * as S from './GenerateArticleForm.styled';
import { FormWrapper } from '../../../Global';

interface IProps {
  setResult: (results: IGeneratedArticleResponse) => void;
}

const GenerateArticleForm = ({ setResult }: IProps) => {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState<Language>(Language.PL);
  const [shouldGenerateImages, setShouldGenerateImages] = useState(false);
  const [numberOfImages, setNumberOfImages] = useState(4);
  const [imagesPrompt, setImagesPrompt] = useState('');

  const { generateArticle, generateImages, progress, isError, isLoading, statusMessage } = useGpt();

  const handleTopicChange = (e: ChangeEvent<HTMLInputElement>) => setTopic(e.target.value);
  const handleGenerateImagesChange = (e: ChangeEvent<HTMLInputElement>) =>
    setShouldGenerateImages(e.target.checked);
  const handleImagesPromptChange = (e: ChangeEvent<HTMLInputElement>) =>
    setImagesPrompt(e.target.value);

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!topic) return;

    const result = await generateArticle({
      language,
      title: topic,
    });
    if (!result) return;

    if (!shouldGenerateImages) {
      setResult(result);
      return;
    }

    const images = await generateImages({
      title: topic,
      language,
      prompt: imagesPrompt,
      numberOfImages,
    });

    setResult({
      ...result,
      images,
    });
  };

  const numberOfSteps = shouldGenerateImages ? 6 : 5;

  return (
    <ModalBody style={{ position: 'relative' }}>
      {isLoading && <S.Progress size="S" value={(100 / numberOfSteps) * progress} />}
      <FormWrapper onSubmit={handleGenerate}>
        <TextInput
          placeholder="Provide a topic for your article"
          label="Topic"
          name="text"
          disabled={isLoading}
          hint={statusMessage}
          error={isError ? 'Something went wrong, please try again...' : ''}
          onChange={handleTopicChange}
          value={topic}
        />
        <Combobox value={language} label="Language" onChange={setLanguage} disabled={isLoading}>
          {Object.values(Language).map((lang) => (
            <ComboboxOption key={lang} value={lang}>
              {lang}
            </ComboboxOption>
          ))}
        </Combobox>
        <Checkbox value={shouldGenerateImages} onChange={handleGenerateImagesChange}>
          Generate images
        </Checkbox>
        {shouldGenerateImages && (
          <>
            <Combobox
              value={`${numberOfImages}`}
              label="Number of images"
              onChange={setNumberOfImages}
              disabled={isLoading}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <ComboboxOption key={index + 1} value={`${index + 1}`}>
                  {index + 1}
                </ComboboxOption>
              ))}
            </Combobox>
            <TextInput
              placeholder="Custom images prompt"
              label="Prompt"
              name="text"
              hint="Provide your own prompt to generate images. If left blank, the topic will be used as a prompt"
              disabled={isLoading}
              onChange={handleImagesPromptChange}
              value={imagesPrompt}
            />
          </>
        )}
        <Button loading={isLoading} disabled={isLoading || !topic} type="submit">
          Submit
        </Button>
      </FormWrapper>
    </ModalBody>
  );
};

export default GenerateArticleForm;
