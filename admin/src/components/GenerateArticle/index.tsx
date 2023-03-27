import React, { useState } from "react";
import { Button, Typography } from "@strapi/design-system";
import { Magic } from "@strapi/icons";

import { GenerateArticleModal } from "./components";

import * as S from "./GenerateArticle.styled";
import { IComponentProps } from "../../types";


const GenerateArticle = (props: IComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <S.Container>
      <Typography
        fontWeight="bold"
        textColor="neutral800"
        as="h2"
        id="title"
        variant="pi"
      >
        {props.name}
      </Typography>
      <Button
        size="S"
        onClick={() => setIsOpen(true)}
        endIcon={<Magic />}
      >
        Generate
      </Button>
      {isOpen && (
        <GenerateArticleModal {...props} onClose={() => setIsOpen(false)} />
      )}
    </S.Container>
  );
};

export default GenerateArticle;
