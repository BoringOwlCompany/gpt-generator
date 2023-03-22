import React, { useState, type ChangeEvent, FormEvent } from "react";
import {
  ModalBody,
  Button,
  TextInput,
  Combobox,
  ComboboxOption,
} from "@strapi/design-system";
import { Language } from "./GenerateArticleForm.config";
import { mockResult, type IMockResults } from "../../../../mock";
import { useStatus } from "../../../../hooks";

import * as S from "./GenerateArticleForm";

interface IProps {
  setResult: (results: IMockResults) => void;
}

const GenerateArticleForm = ({ setResult }: IProps) => {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<Language>(Language.EN);
  const { setStatus, Status, isLoading, isError } = useStatus();

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!topic) return;

    try {
      // TODO: handleGenerateArticle(topic, language)
      setStatus(Status.LOADING);
      setTimeout(() => {
        setStatus(Status.SUCCESS);
        setResult(mockResult);
      }, 2000);
    } catch (e) {
      setStatus(Status.ERROR);
    }
  };

  return (
    <ModalBody>
      <S.Form onSubmit={handleGenerate}>
        <TextInput
          placeholder="Provide a topic for your article"
          label="Topic"
          name="text"
          disabled={isLoading}
          hint={isLoading ? "Generating article please wait..." : ""}
          error={
            isError ? "Something went wrong please try again later..." : ""
          }
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTopic(e.target.value)
          }
          value={topic}
        />
        <Combobox
          value={language}
          label="Language"
          onChange={(value: Language) => setLanguage(value)}
        >
          {Object.values(Language).map((lang) => (
            <ComboboxOption key={lang} value={lang}>
              {lang}
            </ComboboxOption>
          ))}
        </Combobox>
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
