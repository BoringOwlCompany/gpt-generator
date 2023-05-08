import React, { FormEvent, useState } from 'react';
import {
  Card,
  CardHeader,
  CardCheckbox,
  CardAsset,
  CardBody,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardBadge,
  ModalBody,
  ModalFooter,
  Button,
  TextInput,
  Textarea,
  Typography,
} from '@strapi/design-system';
import GenerateArticleResultFaqForm from '../GenerateArticleResultFaqForm';
import type { IComponentProps } from '../../../../types';
import { IGeneratedArticleResponse } from '../../../../../../shared';

import * as S from './GenerateArticleResultForm.styled';
import { generateApi } from '../../../../api';
import { useForm, useStatus } from '../../../../hooks';

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
  const { state, handleChange } = useForm(data);
  const [pickedImage, setPickedImage] = useState<number | null>(null);
  const [seoPickedImage, setSeoPickedImage] = useState<number | null>(null);
  const { setStatus, isError, isLoading } = useStatus();

  const handleImageChange = (index: number) =>
    index === pickedImage ? setPickedImage(null) : setPickedImage(index);
  const handleSeoImageChange = (index: number) =>
    index === seoPickedImage ? setSeoPickedImage(null) : setSeoPickedImage(index);

  const handleApply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setStatus('loading');

    if (pickedImage !== null) {
      const image = state.images?.data[pickedImage];
      if (!image?.b64_json) return;

      try {
        const file = await generateApi.uploadImage(image);
        onChange({ target: { name: 'content.image', value: file } });
      } catch (e) {
        setStatus('error');
        return;
      }
    }

    if (seoPickedImage !== null) {
      const image = state.images?.data[seoPickedImage];
      if (!image?.b64_json) return;

      try {
        const file = await generateApi.uploadImage(image);
        onChange({ target: { name: 'seo.0.image', value: file } });
      } catch (e) {
        setStatus('error');
        return;
      }
    }

    onChange({ target: { name: 'content.title', value: state.article.title } });
    onChange({ target: { name: 'content.slug', value: state.article.slug } });
    onChange({ target: { name: 'content.publishDate', value: new Date().toISOString() } });
    onChange({ target: { name: 'content.introduction', value: state.article.excerpt } });
    onChange({ target: { name: 'content.content', value: state.article.content } });
    onChange({ target: { name: 'seo.0.title', value: state.seo.title } });
    onChange({ target: { name: 'seo.0.description', value: state.seo.description } });
    state.faq.forEach(({ answer, question }, index) => {
      onChange({ target: { name: `seo.0.faq.${index}.question`, value: question } });
      onChange({ target: { name: `seo.0.faq.${index}.answer`, value: answer } });
    });
    onChange({ target: { name: 'videoScript', value: state.videoScript } });

    onClose();
  };

  return (
    <S.Container onSubmit={handleApply}>
      <ModalBody>
        <TextInput
          name="article.title"
          label="title"
          value={state.article.title}
          disabled={isLoading}
          onChange={handleChange}
        />
        <TextInput
          name="article.slug"
          label="slug"
          value={state.article.slug}
          disabled={isLoading}
          onChange={handleChange}
        />
        {state.images && (
          <div>
            <Typography variant="pi" fontWeight="bold">
              Image
            </Typography>
            <S.ImagesContainer>
              {state.images.data.map((image, index) => (
                <Card
                  key={index}
                  style={{ cursor: 'pointer' }}
                  onClick={() => !isLoading && handleImageChange(index)}
                >
                  <CardHeader>
                    <CardCheckbox disabled={isLoading} value={index === pickedImage} />
                    <CardAsset src={`data:image/png;base64,${image.b64_json}`} />
                  </CardHeader>
                  <CardBody>
                    <CardContent>
                      <CardTitle>Image</CardTitle>
                      <CardSubtitle>1024x1024</CardSubtitle>
                    </CardContent>
                    <CardBadge>Image</CardBadge>
                  </CardBody>
                </Card>
              ))}
            </S.ImagesContainer>
            {isError && (
              <Typography textColor="danger600" variant="pi">
                Couldn't upload image to media library
              </Typography>
            )}
          </div>
        )}
        <Textarea
          style={{
            minHeight: '250px',
          }}
          name="article.content"
          label="content"
          value={state.article.content}
          disabled={isLoading}
          onChange={handleChange}
        />
        <Textarea
          name="article.excerpt"
          label="introduction"
          value={state.article.excerpt}
          disabled={isLoading}
          onChange={handleChange}
        />
        <TextInput
          name="seo.title"
          label="seo title"
          value={state.seo.title}
          disabled={isLoading}
          onChange={handleChange}
        />
        <Textarea
          name="seo.description"
          label="seo description"
          value={state.seo.description}
          disabled={isLoading}
          onChange={handleChange}
        />
        {state.images && (
          <div>
            <Typography variant="pi" fontWeight="bold">
              SEO image
            </Typography>
            <S.ImagesContainer>
              {state.images.data.map((image, index) => (
                <Card
                  key={index}
                  style={{ cursor: 'pointer' }}
                  onClick={() => !isLoading && handleSeoImageChange(index)}
                >
                  <CardHeader>
                    <CardCheckbox disabled={isLoading} value={index === seoPickedImage} />
                    <CardAsset src={`data:image/png;base64,${image.b64_json}`} />
                  </CardHeader>
                  <CardBody>
                    <CardContent>
                      <CardTitle>SEO Image</CardTitle>
                      <CardSubtitle>1024x1024</CardSubtitle>
                    </CardContent>
                    <CardBadge>Image</CardBadge>
                  </CardBody>
                </Card>
              ))}
            </S.ImagesContainer>
            {isError && (
              <Typography textColor="danger600" variant="pi">
                Couldn't upload image to media library
              </Typography>
            )}
          </div>
        )}

        {state.faq.length > 0 && (
          <GenerateArticleResultFaqForm
            faq={state.faq}
            disabled={isLoading}
            handleChange={handleChange}
          />
        )}
        {state.videoScript && (
          <Textarea
            name="videoScript"
            label="videoScript"
            value={state.videoScript}
            disabled={isLoading}
            onChange={handleChange}
          />
        )}
      </ModalBody>

      <ModalFooter
        startActions={
          <Button disabled={isLoading} onClick={onClearResult} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={
          <Button loading={isLoading} disabled={isLoading} type="submit">
            Apply
          </Button>
        }
      />
    </S.Container>
  );
};

export default GenerateArticleResultForm;
