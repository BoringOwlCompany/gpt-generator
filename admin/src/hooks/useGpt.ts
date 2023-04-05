import { useState } from 'react';
import { IGeneratedArticleResponse, IImagesRequest, ITitleRequest } from '../../../shared';
import { ImagesResponse } from 'openai';
import { generateApi } from '../api';
import { useStatus } from './useStatus';

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
          articleContent[index] = `<h2>${paragraph}</h2><p>${content.paragraph}</p>`;
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

  return { generateArticle, generateImages, progress, isError, isLoading, statusMessage };
};
