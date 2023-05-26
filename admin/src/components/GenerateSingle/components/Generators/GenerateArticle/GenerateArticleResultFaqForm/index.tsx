import React, { useState } from 'react';
import {
  AccordionGroup,
  Accordion,
  AccordionContent,
  AccordionToggle,
  Box,
} from '@strapi/design-system';
import { TextInput } from '../../../../../Global';
import { useFormContext, useFieldArray } from 'react-hook-form';

import * as S from './GenerateArticleResultFaqForm.styled';
import { IGeneratedArticleResponse } from '../../../../../../../../shared';

interface IProps {
  disabled: boolean;
}

const GenerateArticleResultFaqForm = ({ disabled }: IProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { control } = useFormContext<IGeneratedArticleResponse>();
  const { fields } = useFieldArray({
    name: 'faq',
    control,
  });

  const handleToggle = (id: number) => {
    setExpandedId((s) => (s === id ? null : id));
  };

  return (
    <AccordionGroup label="faq">
      {fields &&
        fields.map((item, index) => (
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
                  <TextInput name={`faq.${index}.question`} label="Question" disabled={disabled} />
                  <TextInput name={`faq.${index}.answer`} label="Answer" disabled={disabled} />
                </S.FaqWrapper>
              </Box>
            </AccordionContent>
          </Accordion>
        ))}
    </AccordionGroup>
  );
};

export default GenerateArticleResultFaqForm;
