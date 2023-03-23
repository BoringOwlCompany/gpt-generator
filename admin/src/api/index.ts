import { request } from "@strapi/helper-plugin";

import type {
  IGenerateArticleRequest,
  IGeneratedArticleResponse,
} from "../types";

export const api = {
  generateArticle: async (data: IGenerateArticleRequest) => {
    return await request(`/generator`, {
      method: "POST",
      body: data,
    });
  },
  save: async (data: IGeneratedArticleResponse) => {
    return await request(`/generator/save`, {
      method: "POST",
      body: data,
    });
  },
};
