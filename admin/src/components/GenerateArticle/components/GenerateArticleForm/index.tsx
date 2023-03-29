import React, { useState, type ChangeEvent, FormEvent } from "react";
import {
  ModalBody,
  Button,
  Checkbox,
  TextInput,
  Combobox,
  ComboboxOption,
} from "@strapi/design-system";
import { useGpt, useStatus } from "../../../../hooks";
import { api } from "../../../../api";
import { IGeneratedArticleResponse, Language } from '../../../../../../shared'

import * as S from "./GenerateArticleForm.styled";

interface IProps {
  setResult: (results: IGeneratedArticleResponse) => void;
}

const GenerateArticleForm = ({ setResult }: IProps) => {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<Language>(Language.PL);
  const [generateImages, setGenerateImages] = useState(false);
  const [imagesPrompt, setImagesPrompt] = useState('');

  const { generateArticle, progress, isError, isLoading, statusMessage } = useGpt()

  const handleTopicChange = (e: ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)
  const handleGenerateImagesChange = (e: ChangeEvent<HTMLInputElement>) => setGenerateImages(e.target.checked)
  const handleImagesPromptChange = (e: ChangeEvent<HTMLInputElement>) => setImagesPrompt(e.target.value)

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!topic) return;

    const result = await generateArticle(topic, language);
    if (!result) return;

    setResult(result);
  };

  return (
    <ModalBody style={{ position: 'relative' }}>
      {isLoading && <S.Progress size='s' value={100 / 10 * progress} />}
      <S.Form onSubmit={handleGenerate}>
        <TextInput
          placeholder="Provide a topic for your article"
          label="Topic"
          name="text"
          disabled={isLoading}
          hint={statusMessage}
          error={
            isError
              ? "Something went wrong, please try again..."
              : ""
          }
          onChange={handleTopicChange}
          value={topic}
        />
        <Combobox
          value={language}
          label="Language"
          onChange={setLanguage}
          disabled={isLoading}
        >
          {Object.values(Language).map((lang) => (
            <ComboboxOption key={lang} value={lang}>
              {lang}
            </ComboboxOption>
          ))}
        </Combobox>
        <Checkbox value={generateImages} onChange={handleGenerateImagesChange}>Generate images</Checkbox>
        {generateImages && <div>
          <TextInput
            placeholder="Custom images prompt"
            label="Prompt"
            name="text"
            hint="Provide your own prompt to generate images. If left blank, the topic will be used as a prompt"
            disabled={isLoading}
            onChange={handleImagesPromptChange}
            value={imagesPrompt}
          />
        </div>}
        <Button
          loading={isLoading}
          disabled={isLoading || !topic}
          type="submit"
        >
          Submit
        </Button>
      </S.Form>
    </ModalBody>
  );
};

export default GenerateArticleForm;
