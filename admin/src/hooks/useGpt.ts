import { useState } from 'react';
import { IGeneratedArticleResponse, Language } from "../../../shared";
import { api } from '../api';
import { useStatus } from "./useStatus"

export const useGpt = () => {
  const { isError, isLoading, statusMessage, Status, setStatus, setStatusMessage } = useStatus();
  const [progress, setProgress] = useState(0);

  const generateArticle = async (topic: string, language: Language): Promise<IGeneratedArticleResponse | null> => {
    try {
      setStatus(Status.LOADING);
      setProgress(0);

      const titleRequest = {
        title: topic,
        language,
      }

      setStatusMessage('Generating title...');
      const { title } = await api.generateTitle(titleRequest);
      setProgress(prev => prev + 1);

      setStatusMessage('Generating paragraphs...');
      const paragraphsTitles = await api.generateParagraphs(titleRequest);
      setProgress(prev => prev + 1);

      const articleContent: string[] = [];
      setStatusMessage(`Generating paragraphs (${paragraphsTitles.length})...`);
      await Promise.all(paragraphsTitles.map(async ({ paragraph }, index) => {
        const content = await api.generateParagraph({
          ...titleRequest,
          paragraph
        })
        setProgress(prev => prev + 1);
        articleContent[index] = `<h2>${paragraph}</h2><p>${content.paragraph}</p>`;
      }));

      const content = articleContent.join('');

      setStatusMessage('Generating excerpt...');
      const { excerpt } = await api.generateExcerpt(titleRequest);
      setProgress(prev => prev + 1);

      const contentRequest = {
        content,
        language
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

  return { generateArticle, progress, isError, isLoading, statusMessage }
}