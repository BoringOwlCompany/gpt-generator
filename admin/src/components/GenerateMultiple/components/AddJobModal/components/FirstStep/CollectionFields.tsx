import React from 'react';
import { Status, IconButton, Flex, Typography } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import { useCollectionContext } from '../../../../../../context';
import { IForm } from '../../AddJobModal';
import { NumberInput, TextInput } from '../../../../../Global';
import RelationalInput from '../../../../../Global/Form/RelationalInput';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  ECollection,
  ERelationalCollection,
  IRelationalCollectionResponse,
} from '../../../../../../../../shared';

interface IProps {
  isLoading: boolean;
}

const CollectionFields = ({ isLoading }: IProps) => {
  const { collection } = useCollectionContext();
  const { control, watch } = useFormContext<IForm>();
  const arrayMethods = useFieldArray({
    name: 'tags',
    keyName: 'fieldId',
    control,
  });

  const language = watch('language');

  if (collection === ECollection.ARTICLE)
    return (
      <>
        <TextInput<IForm>
          placeholder="Provide keywords to generate content"
          label="Keywords"
          name="keywords"
          disabled={isLoading}
        />
        <NumberInput<IForm>
          placeholder="Number of titles"
          label="Number of titles"
          name="numberOfItems"
          disabled={isLoading}
        />
      </>
    );

  const RelationalInputField = ({
    id,
    slug,
    publishedAt,
    index,
  }: IRelationalCollectionResponse & { index: number }) => {
    return (
      <Flex
        key={id}
        marginTop={2}
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={4}
        paddingRight={4}
        hasRadius
        borderSize={1}
        borderColor="neutral200"
        background={isLoading ? 'neutral150' : 'neutral0'}
        justifyContent="space-between"
      >
        <Typography>{slug}</Typography>
        <Flex gap={2}>
          <Status variant={publishedAt ? 'success' : 'secondary'} size="S" showBullet={false}>
            <Typography fontWeight="bold" textColor={publishedAt ? 'success700' : 'secondary700'}>
              {publishedAt ? 'Published' : 'Draft'}
            </Typography>
          </Status>
          <IconButton onClick={() => arrayMethods.remove(index)} label="Delete" icon={<Cross />} />
        </Flex>
      </Flex>
    );
  };

  if (collection === ECollection.FLASHCARD)
    return (
      <>
        <RelationalInput<IForm>
          label="Tag"
          collection={ERelationalCollection.TAG}
          language={language}
          arrayMethods={arrayMethods}
          name="tags"
          multiple={false}
          renderItem={(props, index) => <RelationalInputField {...props} index={index} />}
          pickedIds={arrayMethods.fields.map(({ id }) => id)}
        />
        <NumberInput<IForm>
          placeholder="Number of questions"
          label="Number of questions"
          name="numberOfItems"
          disabled={isLoading}
        />
      </>
    );

  return null;
};

export default CollectionFields;
