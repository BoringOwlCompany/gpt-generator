import { Strapi } from '@strapi/strapi';
import slugify from 'slugify';

import {
  ITitleRequest,
  IContentRequest,
  ITitleWithParagraphRequest,
  Language,
  IVideoScriptScenesRequest,
  IVideoScriptSceneDetailsRequest,
  generateContentHtml,
  generateVideoScriptHtml,
  IJobDetailsItemsArticlesCollectionFields,
} from '../../shared';
import { openai } from '../openai/requests';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitle(data: ITitleRequest) {
    return await openai.generateTitle(data);
  },

  async generateParagraphs(data: ITitleRequest) {
    return await openai.generateParagraphs(data);
  },

  async generateParagraph(data: ITitleWithParagraphRequest) {
    return await openai.generateParagraph(data);
  },

  async generateExcerpt(data: ITitleRequest) {
    return await openai.generateExcerpt(data);
  },

  async generateSeo(data: IContentRequest) {
    return await openai.generateArticleSEO(data);
  },

  async generateFaq(data: IContentRequest) {
    return await openai.generateArticleFaq(data);
  },

  async generateVideoScriptScenes(data: IVideoScriptScenesRequest) {
    return await openai.generateVideoScriptScenes(data);
  },

  async generateVideoScriptSceneDetails(data: IVideoScriptSceneDetailsRequest) {
    return await openai.generateVideoScriptSceneDetails(data);
  },

  async generateVideoScript(data: IVideoScriptScenesRequest) {
    const scenes = await openai.generateVideoScriptScenes(data);
    const videoScript: string[] = [];
    await Promise.all(
      scenes.map(async ({ length, scene }, index) => {
        const { camera, voiceover } = await openai.generateVideoScriptSceneDetails({
          articleContent: data.articleContent,
          language: data.language,
          length,
          scene,
        });
        videoScript[index] = generateVideoScriptHtml(scene, length, camera, voiceover);
      })
    );

    return videoScript.join('');
  },

  async generateArticle(data: IJobDetailsItemsArticlesCollectionFields & { language: Language }) {
    const { title } = await openai.generateTitle({
      title: data.title || '',
      language: data.language,
    });
    const titleRequest = {
      title,
      language: data.language,
    };

    const paragraphsTitles = await openai.generateParagraphs(titleRequest);

    const articleContent: string[] = [];
    await Promise.all(
      paragraphsTitles.map(async ({ paragraph }, index) => {
        const content = await openai.generateParagraph({
          ...titleRequest,
          paragraph,
        });
        articleContent[index] = generateContentHtml(paragraph, content.paragraph);
      })
    );

    const content = articleContent.join('');
    const { excerpt } = await openai.generateExcerpt(titleRequest);

    const contentRequest = {
      content,
      language: data.language,
    };

    const seo = await openai.generateArticleSEO(contentRequest);
    const faq = await openai.generateArticleFaq(contentRequest);

    const image = data?.image?.isActive
      ? await openai.generateImages({
          title,
          prompt: data.image.prompt,
          language: data.language,
          numberOfImages: 1,
        })
      : null;

    const videoScript = data?.videoScript?.isActive
      ? await this.generateVideoScript({
          articleContent: content,
          length: data.videoScript.length,
          language: data.language,
        })
      : null;

    return {
      seo,
      faq,
      article: {
        title,
        content,
        excerpt,
        slug: slugify(title, { lower: true }),
        image,
      },
      videoScript,
    };
  },
});
