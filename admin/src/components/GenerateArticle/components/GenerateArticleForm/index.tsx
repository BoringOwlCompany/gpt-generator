import React, { FormEvent } from 'react';
import { ModalBody, Button, TextInput, Select, Option } from '@strapi/design-system';
import { useForm, useGpt } from '../../../../hooks';
import { IGeneratedArticleResponse, Language, VideoLength } from '../../../../../../shared';

import { AbsoluteProgress, FormWrapper, TitleOptions } from '../../../Global';

interface IProps {
  setResult: (results: IGeneratedArticleResponse) => void;
}

const GenerateArticleForm = ({ setResult }: IProps) => {
  const { state, handleChange, handleValueChange } = useForm({
    topic: '',
    language: Language.PL,
    shouldGenerateImages: false,
    numberOfImages: 4,
    imagesPrompt: '',

    shouldGenerateVideoScript: false,
    videoScriptLength: VideoLength.ONE_MINUTE,
  });

  const {
    generateArticle,
    generateImages,
    generateVideoScript,
    progress,
    isError,
    isLoading,
    statusMessage,
  } = useGpt();

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
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
      <FormWrapper onSubmit={handleGenerate}>
        <TextInput
          placeholder="Provide a topic for your article"
          label="Topic"
          name="topic"
          disabled={isLoading}
          hint={statusMessage}
          error={isError ? 'Something went wrong, please try again...' : ''}
          onChange={handleChange}
          value={state.topic}
        />
        <Select
          value={state.language}
          label="Language"
          onChange={(value: Language) => handleValueChange('language', value)}
          disabled={isLoading}
        >
          {Object.values(Language).map((lang) => (
            <Option key={lang} value={lang}>
              {lang}
            </Option>
          ))}
        </Select>
        <TitleOptions
          disabled={isLoading}
          imagesOptions={{
            checkboxValue: state.shouldGenerateImages,
            checkboxOnChange: (value) => handleValueChange('shouldGenerateImages', value),
            prompt: state.imagesPrompt,
            promptInputName: 'imagesPrompt',
            promptOnChange: handleChange,
            numberOfImages: state.numberOfImages,
            numberOfImagesOnChange: (value) => handleValueChange('numberOfImages', value),
          }}
          videoScriptOptions={{
            checkboxValue: state.shouldGenerateVideoScript,
            checkboxOnChange: (value) => handleValueChange('shouldGenerateVideoScript', value),
            length: state.videoScriptLength,
            lengthInputName: 'videoScriptLength',
            lengthOnChange: (value) => handleValueChange('videoScriptLength', value),
          }}
        />

        <Button loading={isLoading} disabled={isLoading || !state.topic} type="submit">
          Submit
        </Button>
      </FormWrapper>
    </ModalBody>
  );
};

export default GenerateArticleForm;
