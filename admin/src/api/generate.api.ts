import { request } from '@strapi/helper-plugin';
import { ImagesResponse, ImagesResponseDataInner } from 'openai';

import {
  Constant,
  IContentRequest,
  IExcerptResponse,
  IFaqResponse,
  IImageResponse,
  IImagesRequest,
  IParagraphResponse,
  IParagraphsResponse,
  ISeoResponse,
  ITitleRequest,
  ITitleResponse,
  IJobDetailsRequest,
  ITitleWithParagraphRequest,
  IVideoScriptSceneDetailsRequest,
  IVideoScriptSceneDetailsResponse,
  IVideoScriptScenesRequest,
  IVideoScriptScenesResponse,
  Route,
  IGeneratePostContentRequest,
  IGeneratePostContentResponse,
} from '../../../shared';

export const generateApi = {
  generateTitle: async (data: ITitleRequest): Promise<ITitleResponse> => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.SINGLE_ARTICLE_TITLE}`, {
      method: 'POST',
      body: data,
    });
  },
  generateParagraphs: async (data: ITitleRequest): Promise<IParagraphsResponse> => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.SINGLE_ARTICLE_PARAGRAPHS}`, {
      method: 'POST',
      body: data,
    });
  },
  generateParagraph: async (data: ITitleWithParagraphRequest): Promise<IParagraphResponse> => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.SINGLE_ARTICLE_PARAGRAPH}`, {
      method: 'POST',
      body: data,
    });
  },
  generateExcerpt: async (data: ITitleRequest): Promise<IExcerptResponse> => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.SINGLE_ARTICLE_EXCERPT}`, {
      method: 'POST',
      body: data,
    });
  },
  generateSeo: async (data: IContentRequest): Promise<ISeoResponse> => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.SINGLE_ARTICLE_SEO}`, {
      method: 'POST',
      body: data,
    });
  },
  generateFaq: async (data: IContentRequest): Promise<IFaqResponse[]> => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.SINGLE_ARTICLE_FAQ}`, {
      method: 'POST',
      body: data,
    });
  },
  generateImages: async (data: IImagesRequest): Promise<ImagesResponse> => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.IMAGES}`, {
      method: 'POST',
      body: data,
    });
  },
  uploadImage: async (image: ImagesResponseDataInner): Promise<IImageResponse> => {
    const blobImage = await fetch(`data:image/png;base64,${image.b64_json}`).then((res) =>
      res.blob()
    );
    const fileImage = new File([blobImage], 'image.png', {
      type: blobImage.type,
    });

    const form = new FormData();
    form.append('file', fileImage, 'image.png');

    const response = await request(
      `/${Constant.PLUGIN_NAME}${Route.UPLOAD_IMAGE}`,
      {
        headers: {},
        method: 'POST',
        body: form,
      },
      true,
      false
    );

    return response[0];
  },

  generateTitles: async (data: IJobDetailsRequest): Promise<ITitleResponse[]> => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.MULTIPLE_ARTICLES_TITLES}`, {
      method: 'POST',
      body: data,
    });
  },

  generateQuestions: async (data: IJobDetailsRequest): Promise<ITitleResponse[]> => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.MULTIPLE_FLASHCARDS_QUESTIONS}`, {
      method: 'POST',
      body: data,
    });
  },

  generateVideoScriptScenes: async (
    data: IVideoScriptScenesRequest
  ): Promise<IVideoScriptScenesResponse> => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.SINGLE_ARTICLE_VIDEO_SCRIPT_SCENES}`, {
      method: 'POST',
      body: data,
    });
  },

  generateVideoScriptSceneDetails: async (
    data: IVideoScriptSceneDetailsRequest
  ): Promise<IVideoScriptSceneDetailsResponse> => {
    return await request(
      `/${Constant.PLUGIN_NAME}${Route.SINGLE_ARTICLE_VIDEO_SCRIPT_SCENE_DETAILS}`,
      {
        method: 'POST',
        body: data,
      }
    );
  },

  generateSocialMediaPost: async (
    data: IGeneratePostContentRequest
  ): Promise<IGeneratePostContentResponse> => {
    return await request(`/${Constant.PLUGIN_NAME}${Route.SOCIAL_MEDIA_POST}`, {
      method: 'POST',
      body: data,
    });
  },
};
