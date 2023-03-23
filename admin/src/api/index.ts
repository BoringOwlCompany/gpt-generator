import { request } from "@strapi/helper-plugin";

import type {
    IGenerateArticleRequest,
    IGeneratedArticleResponse,
} from "../types";

export const api = {
    generateArticle: async (data: IGenerateArticleRequest) => {
        return await request(`/gpt-generator`, {
            method: "POST",
            body: data,
        });
    },
    save: async (data: IGeneratedArticleResponse) => {
        return await request(`/gpt-generator/save`, {
            method: "POST",
            body: data,
        });
    },
};
