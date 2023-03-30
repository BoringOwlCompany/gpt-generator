import { Strapi } from "@strapi/strapi";
import { ITitleRequest, IContentRequest, ITitleWithParagraphRequest, IImagesRequest } from "../../shared";
import {
  generateArticleFaq,
  generateArticleSEO,
  generateExcerpt,
  generateImages,
  generateParagraph,
  generateParagraphs,
  generateTitle,
} from "../openai/requests";
import utils from "@strapi/utils";

const { NotFoundError } = utils.errors;

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
  },

  async generateImages(data: IImagesRequest) {
    return await generateImages(data);
  },

  async uploadImage(data: any) {
    if (!data.file) throw new NotFoundError("File not found");

    return await strapi.plugins.upload.services.upload.upload({
      data: {},
      files: data.file
    });
  }
});
