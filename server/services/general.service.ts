import { Strapi } from "@strapi/strapi";
import { IImagesRequest } from "../../shared";
import { generateImages } from "../openai/requests";
import utils from "@strapi/utils";

const { NotFoundError } = utils.errors;

export default ({ strapi }: { strapi: Strapi }) => ({
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
