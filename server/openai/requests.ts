import utils from '@strapi/utils';
import { messages } from './requests.config';
import { CreateChatCompletionResponse } from 'openai';
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
} from '../../shared';
import { createChatCompletion, createImages } from './methods';

const { ApplicationError } = utils.errors;

const getContent = (completion: CreateChatCompletionResponse) =>
  completion.choices[0].message?.content || '';

const tryParse = (stringified: string) => {
  try {
    return JSON.parse(stringified);
  } catch (e) {
    throw new ApplicationError('Failed parsing openai response to JSON. Check the prompt', {
      data: stringified,
      message: 'Failed parsing openai response to JSON. Check the prompt',
    });
  }
};

const tryCatch = async (cb: () => any) => {
  try {
    return await cb();
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      let message = e.response ? e.response.data?.message || e.response.data : e.message;
      throw new ApplicationError('Failed parsing openai response to JSON. Check the prompt', {
        data: message,
      });
    }

    throw new ApplicationError('Failed parsing openai response to JSON. Check the prompt', {
      data: e,
    });
  }
};

const generateTitle = async (data: ITitleRequest): Promise<ITitleResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messages.title(data)));
  return tryParse(getContent(completion.data));
};

const generateParagraphs = async (data: ITitleRequest): Promise<IParagraphsResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messages.paragraphs(data)));
  return tryParse(getContent(completion.data));
};

const generateParagraph = async (data: ITitleWithParagraphRequest): Promise<IParagraphResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messages.paragraph(data)));
  return tryParse(getContent(completion.data));
};

const generateExcerpt = async (data: ITitleRequest): Promise<IExcerptResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messages.excerpt(data)));
  return tryParse(getContent(completion.data));
};

const generateArticleSEO = async (data: IContentRequest): Promise<ISeoResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messages.seo(data)));
  return tryParse(getContent(completion.data));
};

const generateArticleFaq = async (data: IContentRequest): Promise<IFaqResponse[]> => {
  const completion = await tryCatch(() => createChatCompletion(messages.faq(data)));
  return tryParse(getContent(completion.data));
};

const generateImages = async (data: IImagesRequest) => {
  const images = await tryCatch(() => createImages(data));
  return images.data;
};

const generateTitles = async (data: ITitlesRequest) => {
  const completion = await tryCatch(() => createChatCompletion(messages.titles(data)));
  return tryParse(getContent(completion.data));
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
};
