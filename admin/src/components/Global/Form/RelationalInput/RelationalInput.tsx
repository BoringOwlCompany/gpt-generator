import React, { ReactElement, useEffect } from 'react';
import {
  FieldValues,
  UseFieldArrayReturn,
  ArrayPath,
  FieldArray,
  FieldArrayWithId,
} from 'react-hook-form';
import { Box, Flex, FieldLabel, Typography } from '@strapi/design-system';
import { ReactSelect } from '@strapi/helper-plugin';
import { ControlledProps } from '../types';
import {
  ERelationalCollection,
  IRelationalCollectionResponse,
  Language,
} from '../../../../../../shared';
import { useRelation } from '../../../../api';
import styled from 'styled-components';
import { components, OptionProps } from 'react-select';

type IProps<T extends FieldValues> = {
  collection: ERelationalCollection;
  language: Language;
  arrayMethods: UseFieldArrayReturn<T, ArrayPath<T> & (string | undefined), 'fieldId'>;

  renderItem: (
    item: FieldArrayWithId<T, ArrayPath<T> & (string | undefined), 'fieldId'>,
    index: number
  ) => ReactElement;
  pickedIds: number[];
};

const RelationalInput = <T extends FieldValues>({
  arrayMethods,
  name,
  collection,
  language,
  isError,
  label,
  pickedIds,
  renderItem,
  multiple = true,
  ...props
}: ControlledProps<T, IProps<T>, true>) => {
  const { data, isLoading, searchFor, fetchNextPage } = useRelation({
    collection,
    language,
    omitIds: pickedIds,
  });

  const options = data.map((props) => ({
    ...props,
    publicationState: props.publishedAt ? 'published' : 'draft',
    label: props.slug,
    value: props.slug,
  }));

  useEffect(() => {
    arrayMethods.replace([]);
  }, [language]);

  return (
    <Box>
      <Flex direction="column" alignItems="stretch" gap={1}>
        <FieldLabel>{label}</FieldLabel>
        <ReactSelect
          {...props}
          value={null}
          isLoading={isLoading}
          isDisabled={props.disabled}
          options={options}
          onMenuScrollToBottom={fetchNextPage}
          onChange={(relation: FieldArray<T, ArrayPath<T> & (string | undefined)>) => {
            if (multiple) arrayMethods.append(relation);
            else arrayMethods.replace([relation]);
          }}
          components={{ Option }}
          onInputChange={(value: string) => searchFor(value)}
        />
      </Flex>
      {arrayMethods.fields.map((item, index) => renderItem(item, index))}
    </Box>
  );
};

const StyledBullet = styled.div<{ isDraft: boolean }>`
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  margin-right: ${({ theme }) => theme.spaces[2]};
  background-color: ${({ theme, isDraft }) =>
    theme.colors[isDraft ? 'secondary600' : 'success600']};
  border-radius: 50%;
`;

const Option = (props: OptionProps<IRelationalCollectionResponse>) => {
  const Component = components.Option;
  const {
    data: { publishedAt, slug },
  } = props;

  return (
    <Component {...props}>
      <Flex>
        <StyledBullet isDraft={!publishedAt} />
        <Typography ellipsis>{slug}</Typography>
      </Flex>
    </Component>
  );
};

export default RelationalInput;
