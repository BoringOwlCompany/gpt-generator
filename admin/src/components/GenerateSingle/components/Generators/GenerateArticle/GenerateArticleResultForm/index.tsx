import React, { useState } from 'react';
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
  Typography,
} from '@strapi/design-system';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { useForm, FormProvider } from 'react-hook-form';
import GenerateArticleResultFaqForm from '../GenerateArticleResultFaqForm';

import * as S from './GenerateArticleResultForm.styled';
import { IFaqResponse, IGeneratedArticleResponse } from '../../../../../../../../shared';
import { useStatus } from '../../../../../../hooks';
import { generateApi } from '../../../../../../api';
import { TextInput, TextArea } from '../../../../../Global';
import { ImagesResponse } from 'openai';

interface IProps {
  initialValues: IGeneratedArticleResponse;
  onClose: () => void;
  onClearResult: () => void;
}

interface IForm {
  articleTitle: string;
  articleContent: string;
  articleExcerpt: string;
  articleSlug: string;
  seoTitle: string;
  seoDescription: string;
  faq: IFaqResponse[];
  videoScript?: string | null;
  images?: ImagesResponse | null;
}

const GenerateArticleResultForm = ({ initialValues, onClose, onClearResult }: IProps) => {
  const methods = useForm<IForm>({
    defaultValues: {
      articleTitle: initialValues.article.title,
      articleContent: initialValues.article.content,
      articleExcerpt: initialValues.article.excerpt,
      articleSlug: initialValues.article.slug,
      seoTitle: initialValues.seo.title,
      seoDescription: initialValues.seo.description,
      faq: initialValues.faq,
      images: initialValues.images,
      videoScript: initialValues.videoScript,
    },
  });
  const [pickedImage, setPickedImage] = useState<number | null>(null);
  const [seoPickedImage, setSeoPickedImage] = useState<number | null>(null);
  const { setStatus, isError, isLoading } = useStatus();
  const { onChange } = useCMEditViewDataManager();

  const handleImageChange = (index: number) =>
    index === pickedImage ? setPickedImage(null) : setPickedImage(index);
  const handleSeoImageChange = (index: number) =>
    index === seoPickedImage ? setSeoPickedImage(null) : setSeoPickedImage(index);

  const state = methods.watch();

  const handleApply = async (e: React.FormEvent) => {
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

    onChange({ target: { name: 'content.title', value: state.articleTitle } });
    onChange({ target: { name: 'content.slug', value: state.articleSlug } });
    onChange({ target: { name: 'content.publishDate', value: new Date().toISOString() } });
    onChange({ target: { name: 'content.introduction', value: state.articleExcerpt } });
    onChange({ target: { name: 'content.content', value: state.articleContent } });
    onChange({ target: { name: 'seo.0.title', value: state.seoTitle } });
    onChange({ target: { name: 'seo.0.description', value: state.seoDescription } });
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
        <FormProvider {...methods}>
          <TextInput<IForm> name="articleTitle" label="Title" disabled={isLoading} />
          <TextInput<IForm> name="articleSlug" label="Slug" disabled={isLoading} />
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
          <TextArea<IForm>
            style={{
              minHeight: '250px',
            }}
            name="articleContent"
            label="Content"
            disabled={isLoading}
          />
          <TextArea<IForm> name="articleExcerpt" label="Introduction" disabled={isLoading} />
          <TextInput<IForm> name="seoTitle" label="SEO Title" disabled={isLoading} />
          <TextArea<IForm> name="seoDescription" label="SEO Description" disabled={isLoading} />
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

          {state.faq.length > 0 && <GenerateArticleResultFaqForm disabled={isLoading} />}
          {state.videoScript && (
            <TextArea<IForm>
              name="videoScript"
              label="Video script"
              value={state.videoScript}
              disabled={isLoading}
            />
          )}
        </FormProvider>
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
