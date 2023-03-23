import React, { useState } from "react";
import { ModalLayout, ModalHeader, Typography } from "@strapi/design-system";
import GenerateArticleResultForm from "../GenerateArticleResultForm";
import GenerateArticleForm from "../GenerateArticleForm";
import { type IMockResults } from "../../../../mock";

interface IProps {
  onClose: () => void;
}

const GenerateArticleModal = ({ onClose }: IProps) => {
  const [result, setResult] = useState<IMockResults | null>(null);

  return (
    <ModalLayout onClose={onClose} labelledBy="title">
      <ModalHeader color="white" labeledBy="">
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Generate article
        </Typography>
      </ModalHeader>
      {result ? (
        <GenerateArticleResultForm
          data={result}
          onClose={onClose}
          onClearResult={() => setResult(null)}
        />
      ) : (
        <GenerateArticleForm setResult={setResult} />
      )}
    </ModalLayout>
  );
};

export default GenerateArticleModal;
