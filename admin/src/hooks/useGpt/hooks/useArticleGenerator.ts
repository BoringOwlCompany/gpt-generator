import { ImagesResponse } from 'openai';
import slugify from 'slugify';
import {
  generateContentHtml,
  generateVideoScriptHtml,
  IGeneratedArticleResponse,
  IImagesRequest,
  ITitleRequest,
  IVideoScriptScenesRequest,
} from '../../../../../shared';
import { generateApi } from '../../../api';
import { cumulativeRequests } from '../../../utils/cumulativeRequests';
import { IGeneratorsProps } from '../useGpt';

export const useArticleGenerator = ({
  setStatus,
  setStatusMessage,
  setProgress,
}: IGeneratorsProps) => {
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
      const { result: scenesDetails, isError } = await cumulativeRequests(
        generateApi.generateVideoScriptSceneDetails,
        {
          args: scenes.map(({ scene, length }) => ({
            ...data,
            scene,
            length,
          })),
          onError: () => setStatus('error'),
        }
      );

      if (isError) return null;

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

  return { generateArticle, generateImages, generateVideoScript };
};
