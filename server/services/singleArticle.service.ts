import { Strapi } from '@strapi/strapi';
import slugify from 'slugify';

import {
  ITitleRequest,
  IContentRequest,
  ITitleWithParagraphRequest,
  IComponentTitle,
  Language,
} from '../../shared';
import { openai } from '../openai/requests';
import { ImagesResponse } from 'openai';

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

  async generateArticle(data: IComponentTitle & { language: Language }) {
    const { title } = await openai.generateTitle({ title: data.title, language: data.language });
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
        articleContent[index] = `<h2>${paragraph}</h2><p>${content.paragraph}</p>`;
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

    const article: {
      title: string;
      content: string;
      excerpt: string;
      slug: string;
      image?: ImagesResponse;
    } = {
      title,
      content,
      excerpt,
      slug: slugify(title, { lower: true }),
    };
    if (data?.image?.isActive) {
      article.image = await openai.generateImages({
        title,
        prompt: data.image.prompt,
        language: data.language,
        numberOfImages: 1,
      });
    }
    return {
      seo,
      faq,
      article,
    };
  },
});
