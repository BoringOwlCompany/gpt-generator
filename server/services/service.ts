import { Strapi } from "@strapi/strapi";
import {
  generateArticleFaq,
  generateArticleSEO,
  generateExcerpt,
  generateParagraph,
  generateParagraphs,
  generateTitle,
} from "../openai/requests";

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitle(data: {
    title: string;
    language: string;
  }) {
    return await generateTitle(data.title, data.language);
  },

  async generateParagraphs(data: {
    title: string;
    language: string;
  }) {
    return await generateParagraphs(data.title, data.language);
  },

  async generateParagraph(data: {
    title: string;
    paragraph: string;
    language: string;
  }) {
    return await generateParagraph(data.title, data.paragraph, data.language);
  },

  async generateExcerpt(data: {
    title: string;
    language: string;
  }) {
    return await generateExcerpt(data.title, data.language);
  },

  async generateSeo(data: {
    content: string;
    language: string;
  }) {
    return await generateArticleSEO(data.content, data.language);
  },

  async generateFaq(data: {
    content: string;
    language: string;
  }) {
    return await generateArticleFaq(data.content, data.language);
  }
});
