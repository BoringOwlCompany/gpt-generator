import { request } from "@strapi/helper-plugin";

import type { IGenerateArticleRequest } from "../../../shared";

export const api = {
  generateArticle: async (data: IGenerateArticleRequest) => {
    return await request(`/gpt-generator`, {
      method: "POST",
      body: data,
    });
  },
};
