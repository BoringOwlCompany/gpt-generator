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
import { useStatus } from "../../../../hooks";
import type { IMockResults } from "../../../../mock";

import * as S from "./GenerateArticleResultForm.styled";

interface IProps {
  data: IMockResults;
  onClose: () => void;
  onClearResult: () => void;
}

const GenerateArticleResultForm = ({
  data,
  onClose,
  onClearResult,
}: IProps) => {
  const [state, dispatch] = useReducer(resultReducer, data);
  const { setStatus, Status, isLoading, isError } = useStatus();

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
        <Textarea
          style={{
            minHeight: "300px",
          }}
          name="content"
          label="content"
          disabled={isLoading}
          value={state.content}
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
          value={state.introduction}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({
              type: ResultAction.SET_INTRODUCTION,
              payload: e.target.value,
            })
          }
        />
        <TextInput
          name="seo_title"
          label="Seo title"
          disabled={isLoading}
          value={state.seo.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: ResultAction.SET_SEO_TITLE,
              payload: e.target.value,
            })
          }
        />
        <TextInput
          name="seo_description"
          label="Seo description"
          disabled={isLoading}
          value={state.seo.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: ResultAction.SET_SEO_DESCRIPTION,
              payload: e.target.value,
            })
          }
        />
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
