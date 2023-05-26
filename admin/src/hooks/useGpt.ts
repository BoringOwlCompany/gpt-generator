import { useState } from 'react';
import {
  Constant,
  generateContentHtml,
  generateVideoScriptHtml,
  IGeneratedArticleResponse,
  IImagesRequest,
  ITitleRequest,
  ITitleResponse,
  IJobDetailsRequest,
  IVideoScriptScenesRequest,
  ECollection,
} from '../../../shared';
import { ImagesResponse } from 'openai';
import { generateApi } from '../api';
import { useStatus } from './useStatus';
import slugify from 'slugify';
import { cumulativeRequests } from '../utils/cumulativeRequests';

export const useGpt = () => {
  const { isError, isLoading, statusMessage, setStatus, setStatusMessage } = useStatus();
  const [progress, setProgress] = useState(0);

  const generateArticle = async (
    data: ITitleRequest
  ): Promise<IGeneratedArticleResponse | null> => {
    try {
      setStatus('loading');
      setProgress(0);

      setStatusMessage('Generating title...');
      const { title } = await generateApi.generateTitle(data);
      setProgress((prev) => prev + 1);

      const titleRequest = {
        title,
        language: data.language,
      };

      setStatusMessage('Generating paragraphs...');
      const paragraphsTitles = await generateApi.generateParagraphs(titleRequest);
      setProgress((prev) => prev + 1);

      const articleContent: string[] = [];
      await Promise.all(
        paragraphsTitles.map(async ({ paragraph }, index) => {
          const content = await generateApi.generateParagraph({
            ...titleRequest,
            paragraph,
          });
          articleContent[index] = generateContentHtml(paragraph, content.paragraph);
        })
      );

      const content = articleContent.join('');

      setStatusMessage('Generating excerpt...');
      const { excerpt } = await generateApi.generateExcerpt(titleRequest);
      setProgress((prev) => prev + 1);

      const contentRequest = {
        content,
        language: data.language,
      };

      setStatusMessage('Generating seo fields...');
      const seo = await generateApi.generateSeo(contentRequest);
      setProgress((prev) => prev + 1);

      setStatusMessage('Generating faq...');
      const faq = await generateApi.generateFaq(contentRequest);
      setProgress((prev) => prev + 1);

      setStatus('success');

      return {
        article: {
          title,
          content,
          excerpt,
          slug: slugify(title, { lower: true }),
        },
        seo,
        faq,
      };
    } catch (e) {
      setStatus('error');
      return null;
    }
  };

  const generateImages = async (data: IImagesRequest): Promise<ImagesResponse | null> => {
    try {
      setStatus('loading');

      setStatusMessage('Generating images...');
      const images = await generateApi.generateImages(data);
      setProgress((prev) => prev + 1);

      setStatus('success');
      return images;
    } catch (e) {
      setStatus('error');
      return null;
    }
  };

  const generateVideoScript = async (data: IVideoScriptScenesRequest): Promise<string | null> => {
    try {
      setStatus('loading');
      setStatusMessage('Generating video script scenes...');
      const scenes = await generateApi.generateVideoScriptScenes(data);

      setStatusMessage('Generating video script scene details...');
      const videoScript: string[] = [];
      const scenesDetails = await cumulativeRequests(generateApi.generateVideoScriptSceneDetails, {
        args: scenes.map(({ scene, length }) => ({
          ...data,
          scene,
          length,
        })),
        onError: () => setStatus('error'),
      });

      scenesDetails.map(({ camera, voiceover }, index) => {
        const { scene, length } = scenes[index];
        videoScript.push(generateVideoScriptHtml(scene, length, camera, voiceover));
      });

      setProgress((prev) => prev + 1);
      setStatus('success');
      return videoScript.join('');
    } catch (e) {
      setStatus('error');
      return null;
    }
  };

  const generateDetailsForMultipleGenerator = async (
    data: IJobDetailsRequest,
    collection: ECollection
  ) => {
    if (collection === ECollection.ARTICLE) return generateTitles(data);
    if (collection === ECollection.FLASHCARD) return generateQuestions(data);
  };

  const generateQuestions = async (data: IJobDetailsRequest): Promise<ITitleResponse[]> => {
    setStatus('loading');
    setStatusMessage('Generating questions...');
    setProgress(0);

    const allTitles = [{ title: 'Test1' }, { title: 'Test2' }];

    setStatus('success');
    return allTitles.flat(1).slice(0, data.numberOfItems);
  };

  const generateTitles = async (data: IJobDetailsRequest): Promise<ITitleResponse[]> => {
    setStatus('loading');
    setStatusMessage('Generating titles...');
    setProgress(0);

    const allTitles = await cumulativeRequests(generateApi.generateTitles, {
      args: Array.from({
        length: Math.ceil(data.numberOfItems / Constant.TITLES_TO_GENERATE_PER_REQUEST),
      }).map(() => ({
        ...data,
        numberOfTitles: Constant.TITLES_TO_GENERATE_PER_REQUEST,
      })),
      onError: () => setStatus('error'),
      onSuccess: () => setProgress((prev) => prev + 1),
    });

    setStatus('success');
    return allTitles.flat(1).slice(0, data.numberOfItems);
  };

  return {
    generateArticle,
    generateImages,
    generateVideoScript,
    generateDetailsForMultipleGenerator,
    progress,
    isError,
    isLoading,
    statusMessage,
  };
};
