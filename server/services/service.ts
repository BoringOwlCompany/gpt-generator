import { Strapi } from "@strapi/strapi";
import { ITitleRequest, IContentRequest, ITitleWithParagraphRequest } from "../../shared";
import {
  generateArticleFaq,
  generateArticleSEO,
  generateExcerpt,
  generateParagraph,
  generateParagraphs,
  generateTitle,
} from "../openai/requests";

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateTitle(data: ITitleRequest) {
    return await generateTitle(data);
  },

  async generateParagraphs(data: ITitleRequest) {
    return await generateParagraphs(data);
  },

  async generateParagraph(data: ITitleWithParagraphRequest) {
    return await generateParagraph(data);
  },

  async generateExcerpt(data: ITitleRequest) {
    return await generateExcerpt(data);
  },

  async generateSeo(data: IContentRequest) {
    return await generateArticleSEO(data);
  },

  async generateFaq(data: IContentRequest) {
    return await generateArticleFaq(data);
  }
});
