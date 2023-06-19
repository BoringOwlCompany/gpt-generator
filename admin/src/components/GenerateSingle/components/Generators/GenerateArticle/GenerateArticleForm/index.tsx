import React from 'react';
import { ModalBody, Button } from '@strapi/design-system';
import { useForm, FormProvider } from 'react-hook-form';
import { useGpt } from '../../../../../../hooks';
import {
  IGeneratedArticleResponse,
  Language,
  ELength,
  languagesOptions,
} from '../../../../../../../../shared';

import {
  AbsoluteProgress,
  FormWrapper,
  Select,
  TextInput,
  TitleOptions,
} from '../../../../../Global';

interface IProps {
  setResult: (results: IGeneratedArticleResponse) => void;
}

interface IForm {
  topic: string;
  language: Language;
  shouldGenerateImages: boolean;
  numberOfImages: number;
  imagesPrompt: string;

  shouldGenerateVideoScript: boolean;
  videoScriptLength: ELength;
}

const GenerateArticleForm = ({ setResult }: IProps) => {
  const methods = useForm<IForm>({
    defaultValues: {
      topic: '',
      language: Language.PL,
      shouldGenerateImages: false,
      numberOfImages: 4,
      imagesPrompt: '',

      shouldGenerateVideoScript: false,
      videoScriptLength: ELength.ONE_MINUTE,
    },
  });

  const state = methods.watch();

  const {
    generateArticle,
    generateImages,
    generateVideoScript,
    progress,
    isError,
    isLoading,
    statusMessage,
  } = useGpt();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!state.topic) return;

    const article = await generateArticle({
      language: state.language,
      title: state.topic,
    });
    if (!article) return;

    let result = { ...article };

    if (state.shouldGenerateImages) {
      const images = await generateImages({
        title: state.topic,
        language: state.language,
        prompt: state.imagesPrompt,
        numberOfImages: state.numberOfImages,
      });
      if (!images) return;

      result.images = images;
    }

    if (state.shouldGenerateVideoScript) {
      const videoScript = await generateVideoScript({
        language: state.language,
        length: state.videoScriptLength,
        articleContent: article.article.content,
      });
      if (!videoScript) return;

      result.videoScript = videoScript;
    }

    setResult(result);
  };

  const numberOfSteps =
    5 + Number(state.shouldGenerateImages) + Number(state.shouldGenerateVideoScript);

  return (
    <ModalBody style={{ position: 'relative' }}>
      <AbsoluteProgress show={isLoading} max={numberOfSteps} value={progress} />
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleGenerate}>
          <TextInput<IForm>
            placeholder="Provide a topic for your article"
            label="Topic"
            name="topic"
            disabled={isLoading}
            hint={statusMessage}
            isError={isError}
          />

          <Select<IForm>
            name="language"
            label="Language"
            disabled={isLoading}
            options={languagesOptions}
          />

          <TitleOptions<IForm>
            disabled={isLoading}
            imagesOptions={{
              checkboxName: 'shouldGenerateImages',
              promptName: 'imagesPrompt',
              numberOfImagesName: 'numberOfImages',
            }}
            videoScriptOptions={{
              checkboxName: 'shouldGenerateVideoScript',
              lengthName: 'videoScriptLength',
            }}
          />

          <Button loading={isLoading} disabled={isLoading || !state.topic} type="submit">
            Submit
          </Button>
        </FormWrapper>
      </FormProvider>
    </ModalBody>
  );
};

export default GenerateArticleForm;
