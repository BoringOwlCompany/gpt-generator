import utils from '@strapi/utils';
import { messages } from './requests.config';
import { CreateChatCompletionResponse } from 'openai';
import { AxiosResponse } from 'openai/node_modules/axios';
import { AxiosError } from 'axios';
import {
  IContentRequest,
  IExcerptResponse,
  IFaqResponse,
  IImagesRequest,
  IParagraphResponse,
  IParagraphsResponse,
  ISeoResponse,
  ITitleRequest,
  ITitleResponse,
  ITitlesRequest,
  ITitleWithParagraphRequest,
  IVideoScriptSceneDetailsRequest,
  IVideoScriptSceneDetailsResponse,
  IVideoScriptScenesRequest,
  IVideoScriptScenesResponse,
} from '../../shared';
import { createChatCompletion, createImages } from './methods';

const { ApplicationError } = utils.errors;

const getContent = (completion: AxiosResponse<CreateChatCompletionResponse, any>) =>
  completion.data.choices[0].message?.content || '';

const tryParse = (completion: AxiosResponse<CreateChatCompletionResponse, any>) => {
  const stringified = getContent(completion);

  try {
    return JSON.parse(stringified);
  } catch (e) {
    throw new ApplicationError('Failed parsing openai response to JSON. Check the prompt', {
      data: { stringified },
      message: 'Failed parsing openai response to JSON. Check the prompt',
    });
  }
};

const tryCatch = async <T>(cb: () => T) => {
  try {
    return await cb();
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      let message = e.response ? e.response.data?.message || e.response.data : e.message;
      throw new ApplicationError('Application error', {
        data: message,
      });
    }

    throw new ApplicationError('Application error', {
      data: e,
    });
  }
};

const generateTitle = async (data: ITitleRequest): Promise<ITitleResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messages.title(data)));
  return tryParse(completion);
};

const generateParagraphs = async (data: ITitleRequest): Promise<IParagraphsResponse> => {
  console.log(messages.paragraphs(data));
  const completion = await tryCatch(() => createChatCompletion(messages.paragraphs(data)));
  return tryParse(completion);
};

const generateParagraph = async (data: ITitleWithParagraphRequest): Promise<IParagraphResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messages.paragraph(data)));
  return tryParse(completion);
};

const generateExcerpt = async (data: ITitleRequest): Promise<IExcerptResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messages.excerpt(data)));
  return tryParse(completion);
};

const generateArticleSEO = async (data: IContentRequest): Promise<ISeoResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messages.seo(data)));
  return tryParse(completion);
};

const generateArticleFaq = async (data: IContentRequest): Promise<IFaqResponse[]> => {
  const completion = await tryCatch(() => createChatCompletion(messages.faq(data)));
  return tryParse(completion);
};

const generateImages = async (data: IImagesRequest) => {
  const images = await tryCatch(() => createImages(data));
  return images.data;
};

const generateTitles = async (data: ITitlesRequest) => {
  const completion = await tryCatch(() => createChatCompletion(messages.titles(data)));
  return tryParse(completion);
};

const generateVideoScriptScenes = async (
  data: IVideoScriptScenesRequest
): Promise<IVideoScriptScenesResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messages.videoScriptScenes(data)));
  return tryParse(completion);
};

const generateVideoScriptSceneDetails = async (
  data: IVideoScriptSceneDetailsRequest
): Promise<IVideoScriptSceneDetailsResponse> => {
  const completion = await tryCatch(() =>
    createChatCompletion(messages.videoScriptSceneDetails(data))
  );
  return tryParse(completion);
};

export const openai = {
  generateTitle,
  generateParagraphs,
  generateParagraph,
  generateExcerpt,
  generateArticleSEO,
  generateArticleFaq,
  generateImages,
  generateTitles,
  generateVideoScriptScenes,
  generateVideoScriptSceneDetails,
};
