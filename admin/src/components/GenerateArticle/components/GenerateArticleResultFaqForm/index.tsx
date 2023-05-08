import React, { useState, type ChangeEvent, Dispatch } from 'react';
import {
  Textarea,
  AccordionGroup,
  Accordion,
  AccordionContent,
  AccordionToggle,
  Box,
} from '@strapi/design-system';

import type { IFaqResponse } from '../../../../../../shared';

import * as S from './GenerateArticleResultFaqForm.styled';

interface IProps {
  faq: IFaqResponse[];
  disabled: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenerateArticleResultFaqForm = ({ faq, disabled, handleChange }: IProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId((s) => (s === id ? null : id));
  };

  return (
    <AccordionGroup label="faq">
      {faq &&
        faq.map((item, index) => (
          <Accordion
            key={`Faq-${index}`}
            expanded={expandedId === index}
            onToggle={() => handleToggle(index)}
            size="S"
            id={`acc-${index}`}
          >
            <AccordionToggle title={item.question} togglePosition="left" />
            <AccordionContent>
              <Box padding={3}>
                <S.FaqWrapper>
                  <Textarea
                    name={`faq.${index}.question`}
                    label="question"
                    value={item.question}
                    disabled={disabled}
                    onChange={handleChange}
                  />
                  <Textarea
                    name={`faq.${index}.answer`}
                    label="answer"
                    value={item.answer}
                    disabled={disabled}
                    onChange={handleChange}
                  />
                </S.FaqWrapper>
              </Box>
            </AccordionContent>
          </Accordion>
        ))}
    </AccordionGroup>
  );
};

export default GenerateArticleResultFaqForm;
