import { messagesArticles } from './messages';
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
  IJobDetailsRequest,
  ITitleWithParagraphRequest,
  IVideoScriptSceneDetailsRequest,
  IVideoScriptSceneDetailsResponse,
  IVideoScriptScenesRequest,
  IVideoScriptScenesResponse,
} from '../../../../shared';
import { createChatCompletion, createImages } from '../../methods';
import { tryCatch, tryParse } from '../utils';

const generateTitle = async (data: ITitleRequest): Promise<ITitleResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messagesArticles.title(data)));
  return tryParse(completion);
};

const generateParagraphs = async (data: ITitleRequest): Promise<IParagraphsResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messagesArticles.paragraphs(data)));
  return tryParse(completion);
};

const generateParagraph = async (data: ITitleWithParagraphRequest): Promise<IParagraphResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messagesArticles.paragraph(data)));
  return tryParse(completion);
};

const generateExcerpt = async (data: ITitleRequest): Promise<IExcerptResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messagesArticles.excerpt(data)));
  return tryParse(completion);
};

const generateArticleSEO = async (data: IContentRequest): Promise<ISeoResponse> => {
  const completion = await tryCatch(() => createChatCompletion(messagesArticles.seo(data)));
  return tryParse(completion);
};

const generateArticleFaq = async (data: IContentRequest): Promise<IFaqResponse[]> => {
  const completion = await tryCatch(() => createChatCompletion(messagesArticles.faq(data)));
  return tryParse(completion);
};

const generateImages = async (data: IImagesRequest) => {
  const images = await tryCatch(() => createImages(data));
  return images.data;
};

const generateTitles = async (data: IJobDetailsRequest) => {
  const completion = await tryCatch(() => createChatCompletion(messagesArticles.titles(data)));
  return tryParse(completion);
};

const generateVideoScriptScenes = async (
  data: IVideoScriptScenesRequest
): Promise<IVideoScriptScenesResponse> => {
  const completion = await tryCatch(() =>
    createChatCompletion(messagesArticles.videoScriptScenes(data))
  );
  return tryParse(completion);
};

const generateVideoScriptSceneDetails = async (
  data: IVideoScriptSceneDetailsRequest
): Promise<IVideoScriptSceneDetailsResponse> => {
  const completion = await tryCatch(() =>
    createChatCompletion(messagesArticles.videoScriptSceneDetails(data))
  );
  return tryParse(completion);
};

export const openaiArticles = {
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
