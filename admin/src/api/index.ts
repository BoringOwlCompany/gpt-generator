import { request } from "@strapi/helper-plugin";
import { ImagesResponse, ImagesResponseDataInner } from 'openai'

import type { IContentRequest, IExcerptResponse, IFaqResponse, IImageResponse, IImagesRequest, IParagraphResponse, IParagraphsResponse, ISeoResponse, ITitleRequest, ITitleResponse, ITitleWithParagraphRequest } from "../../../shared";

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
  generateImages: async (data: IImagesRequest): Promise<ImagesResponse> => {
    return await request(`/gpt-generator/images`, {
      method: "POST",
      body: data,
    });
  },
  uploadImage: async (image: ImagesResponseDataInner): Promise<IImageResponse> => {
    const blobImage = await fetch(`data:image/png;base64,${image.b64_json}`).then(res => res.blob());
    const fileImage = new File([blobImage], 'image.png', {
      type: blobImage.type
    })

    const form = new FormData();
    form.append('file', fileImage, 'image.png');

    const response = await request('/gpt-generator/upload-image', {
      headers: {},
      method: 'POST',
      body: form,
    }, true, false);

    return response[0];
  },
};
