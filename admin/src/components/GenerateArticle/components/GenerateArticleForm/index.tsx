import React, { useState, type ChangeEvent, FormEvent } from "react";
import {
  ModalBody,
  Button,
  TextInput,
  Combobox,
  ComboboxOption,
} from "@strapi/design-system";
import { Language } from "./GenerateArticleForm.config";
import { useStatus } from "../../../../hooks";
import { api } from "../../../../api";
import { IGeneratedArticleResponse } from '../../../../../../shared'

import * as S from "./GenerateArticleForm.styled";

interface IProps {
  setResult: (results: IGeneratedArticleResponse) => void;
}

const GenerateArticleForm = ({ setResult }: IProps) => {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<Language>(Language.PL);
  const { setStatus, Status, isLoading, isError } = useStatus();

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!topic) return;

    const titleRequest = {
      title: topic,
      language,
    }

    try {
      setStatus(Status.LOADING);

      let articleContent = '';

      const { title } = await api.generateTitle(titleRequest);

      const paragraphsTitles = await api.generateParagraphs(titleRequest);
      await Promise.all(paragraphsTitles.map(async ({ paragraph }) => {
        const content = await api.generateParagraph({
          ...titleRequest,
          paragraph
        })

        articleContent += `<h2>${paragraph}</h2><p>${content.paragraph}</p>`;
      }));

      const { excerpt } = await api.generateExcerpt(titleRequest);

      const contentRequest = {
        content: articleContent,
        language
      }
      const seo = await api.generateSeo(contentRequest);
      const faq = await api.generateFaq(contentRequest);

      const result: IGeneratedArticleResponse = {
        article: {
          content: articleContent,
          excerpt,
          title
        },
        seo,
        faq
      }

      setStatus(Status.SUCCESS);
      setResult(result);
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
          hint={
            isLoading
              ? "Generating an article can take more than a minute, do not close this window..."
              : ""
          }
          error={
            isError
              ? "Something went wrong please try again later..."
              : ""
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
          disabled={isLoading}
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
