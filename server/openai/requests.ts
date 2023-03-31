import utils from '@strapi/utils';
import { messages } from './requests.config';
import { CreateChatCompletionResponse } from 'openai';
import {
  IContentRequest,
  IFaqResponse,
  IImagesRequest,
  IParagraphResponse,
  IParagraphsResponse,
  ISeoResponse,
  ITitleRequest,
  ITitleResponse,
  ITitlesRequest,
  ITitleWithParagraphRequest,
  Language,
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
    });
  }
};

export const generateTitle = async (data: ITitleRequest): Promise<ITitleResponse> => {
  const completion = await createChatCompletion(messages.title(data));
  return tryParse(getContent(completion.data));
};

export const generateParagraphs = async (data: ITitleRequest): Promise<IParagraphsResponse> => {
  const completion = await createChatCompletion(messages.paragraphs(data));
  return tryParse(getContent(completion.data));
};

export const generateParagraph = async (
  data: ITitleWithParagraphRequest
): Promise<IParagraphResponse> => {
  const completion = await createChatCompletion(messages.paragraph(data));
  return tryParse(getContent(completion.data));
};

export const generateExcerpt = async (data: ITitleRequest): Promise<IParagraphResponse> => {
  const completion = await createChatCompletion(messages.excerpt(data));
  return tryParse(getContent(completion.data));
};

export const generateArticleSEO = async (data: IContentRequest): Promise<ISeoResponse> => {
  const completion = await createChatCompletion(messages.seo(data));
  return tryParse(getContent(completion.data));
};

export const generateArticleFaq = async (data: IContentRequest): Promise<IFaqResponse[]> => {
  const completion = await createChatCompletion(messages.faq(data));
  return tryParse(getContent(completion.data));
};

export const generateImages = async (data: IImagesRequest) => {
  const images = await createImages(data);
  return images.data;
};

export const generateTitles = async (data: ITitlesRequest) => {
  const completion = await createChatCompletion(messages.titles(data));
  return tryParse(getContent(completion.data));
};
