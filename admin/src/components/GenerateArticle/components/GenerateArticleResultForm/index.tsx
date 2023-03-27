import React, {
  useReducer,
  type ChangeEvent,
  FormEvent,
} from "react";
import {
  ModalBody,
  ModalFooter,
  Button,
  TextInput,
  Textarea,
} from "@strapi/design-system";
import {
  resultReducer,
  ResultAction,
} from "./GenerateArticleResultForm.reducer";
import GenerateArticleResultFaqForm from "../GenerateArticleResultFaqForm";
import type { IComponentProps } from "../../../../types";
import { IGeneratedArticleResponse } from '../../../../../../shared'

import * as S from "./GenerateArticleResultForm.styled";

interface IProps {
  data: IGeneratedArticleResponse;
  onClose: () => void;
  onClearResult: () => void;
}

const GenerateArticleResultForm = ({
  data,
  onClose,
  onClearResult,
  onChange,
}: IProps & IComponentProps) => {
  const [state, dispatch] = useReducer(resultReducer, data);
  const { article, faq, seo } = state;

  const handleApply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    onChange({ target: { name: "content.title", value: article.title } });
    onChange({ target: { name: "content.introduction", value: article.excerpt } });
    onChange({ target: { name: "content.content", value: article.content } });
    onChange({ target: { name: "seo.0.title", value: seo.title } });
    onChange({ target: { name: "seo.0.description", value: seo.description } });
    faq.forEach(({ answer, question }, index) => {
      onChange({ target: { name: `seo.0.faq.${index}.question`, value: question } });
      onChange({ target: { name: `seo.0.faq.${index}.answer`, value: answer } });
    })
    onClose();
  };

  return (
    <S.Container onSubmit={handleApply}>
      <ModalBody>
        <TextInput
          name="title"
          label="title"
          value={state.article.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: ResultAction.SET_TITLE,
              payload: e.target.value,
            })
          }
        />
        <Textarea
          style={{
            minHeight: "250px",
          }}
          name="content"
          label="content"
          value={state.article.content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({
              type: ResultAction.SET_CONTENT,
              payload: e.target.value,
            })
          }
        />
        <Textarea
          name="introduction"
          label="introduction"
          value={state.article.excerpt}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({
              type: ResultAction.SET_EXCERPT,
              payload: e.target.value,
            })
          }
        />
        <TextInput
          name="seo_title"
          label="seo title"
          value={state.seo.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: ResultAction.SET_SEO_TITLE,
              payload: e.target.value,
            })
          }
        />
        <Textarea
          name="seo_description"
          label="seo description"
          value={state.seo.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: ResultAction.SET_SEO_DESCRIPTION,
              payload: e.target.value,
            })
          }
        />

        {faq.length > 0 && (
          <GenerateArticleResultFaqForm
            faq={faq}
            dispatch={dispatch}
          />
        )}
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={onClearResult} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={
          <Button
            type="submit"
          >
            Apply
          </Button>
        }
      />
    </S.Container>
  );
};

export default GenerateArticleResultForm;
