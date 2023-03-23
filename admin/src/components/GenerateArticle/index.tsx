import React, { useState } from "react";
import { Button, Typography } from "@strapi/design-system";
import { Magic } from "@strapi/icons";

import { GenerateArticleModal } from "./components";

import * as S from "./GenerateArticle.styled";

const GenerateArticle = () => {
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
        generate with AI
      </Typography>
      <Button size="S" onClick={() => setIsOpen(true)} endIcon={<Magic />}>
        Generate
      </Button>
      {isOpen && <GenerateArticleModal onClose={() => setIsOpen(false)} />}
    </S.Container>
  );
};

export default GenerateArticle;
