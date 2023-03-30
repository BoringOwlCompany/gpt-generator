import { useState } from 'react';
import { IGeneratedArticleResponse, IImagesRequest, ITitleRequest, Language } from "../../../shared";
import { ImagesResponse } from 'openai'
import { api } from '../api';
import { useStatus } from "./useStatus"

export const useGpt = () => {
  const { isError, isLoading, statusMessage, Status, setStatus, setStatusMessage } = useStatus();
  const [progress, setProgress] = useState(0);

  const generateArticle = async (data: ITitleRequest): Promise<IGeneratedArticleResponse | null> => {
    try {
      setStatus(Status.LOADING);
      setProgress(0);


      setStatusMessage('Generating title...');
      const { title } = await api.generateTitle(data);
      setProgress(prev => prev + 1);

      setStatusMessage('Generating paragraphs...');
      const paragraphsTitles = await api.generateParagraphs(data);
      setProgress(prev => prev + 1);

      const articleContent: string[] = [];
      await Promise.all(paragraphsTitles.map(async ({ paragraph }, index) => {
        const content = await api.generateParagraph({
          ...data,
          paragraph
        })
        articleContent[index] = `<h2>${paragraph}</h2><p>${content.paragraph}</p>`;
      }));

      const content = articleContent.join('');

      setStatusMessage('Generating excerpt...');
      const { excerpt } = await api.generateExcerpt(data);
      setProgress(prev => prev + 1);

      const contentRequest = {
        content,
        language: data.language
      }

      setStatusMessage('Generating seo fields...');
      const seo = await api.generateSeo(contentRequest);
      setProgress(prev => prev + 1);

      setStatusMessage('Generating faq...');
      const faq = await api.generateFaq(contentRequest);
      setProgress(prev => prev + 1);

      setStatus(Status.SUCCESS);

      return {
        article: {
          title,
          content,
          excerpt,
        },
        seo,
        faq
      }
    } catch (e) {
      setStatus(Status.ERROR);
      return null;
    }
  }

  const generateImages = async (data: IImagesRequest): Promise<ImagesResponse | null> => {
    try {
      setStatus(Status.LOADING);

      setStatusMessage('Generating images...');
      const images = await api.generateImages(data);
      setProgress(prev => prev + 1);

      setStatus(Status.SUCCESS);
      return images;
    } catch (e) {
      setStatus(Status.ERROR);
      return null;
    }
  }

  return { generateArticle, generateImages, progress, isError, isLoading, statusMessage }
}