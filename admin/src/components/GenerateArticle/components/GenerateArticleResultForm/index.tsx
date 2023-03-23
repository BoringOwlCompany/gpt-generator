import React, { useReducer, type ChangeEvent, FormEvent } from "react";
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
import { useStatus } from "../../../../hooks";
import type { IGeneratedArticleResponse } from "../../../../types";

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
}: IProps) => {
  const [state, dispatch] = useReducer(resultReducer, data);
  const { setStatus, Status, isLoading } = useStatus();
  const faq = state.faq;

  const handleApply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setStatus(Status.LOADING);

      setTimeout(() => {
        setStatus(Status.SUCCESS);
        console.log(state, "SUBMITED STATE");
        onClose();
      }, 2000);
    } catch (e) {
      setStatus(Status.ERROR);
    }
  };

  return (
    <S.Container onSubmit={handleApply}>
      <ModalBody>
        <TextInput
          name="title"
          label="title"
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
            isLoading={isLoading}
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
          <Button type="submit" loading={isLoading} disabled={isLoading}>
            Apply
          </Button>
        }
      />
    </S.Container>
  );
};

export default GenerateArticleResultForm;
