import { request } from "@strapi/helper-plugin";

import type { IContentRequest, IExcerptResponse, IFaqResponse, IParagraphResponse, IParagraphsResponse, ISeoResponse, ITitleRequest, ITitleResponse, ITitleWithParagraphRequest } from "../../../shared";

export const api = {
  generateTitle: async (data: ITitleRequest): Promise<ITitleResponse> => {
    return await request(`/gpt-generator/title`, {
      method: "POST",
      body: data,
    });
  },
  generateParagraphs: async (data: ITitleRequest): Promise<IParagraphsResponse> => {
    return await request(`/gpt-generator/paragraphs`, {
      method: "POST",
      body: data,
    });
  },
  generateParagraph: async (data: ITitleWithParagraphRequest): Promise<IParagraphResponse> => {
    return await request(`/gpt-generator/paragraph`, {
      method: "POST",
      body: data,
    });
  },
  generateExcerpt: async (data: ITitleRequest): Promise<IExcerptResponse> => {
    return await request(`/gpt-generator/excerpt`, {
      method: "POST",
      body: data,
    });
  },
  generateSeo: async (data: IContentRequest): Promise<ISeoResponse> => {
    return await request(`/gpt-generator/seo`, {
      method: "POST",
      body: data,
    });
  },
  generateFaq: async (data: IContentRequest): Promise<IFaqResponse[]> => {
    return await request(`/gpt-generator/faq`, {
      method: "POST",
      body: data,
    });
  },
};
