import { ImagesResponse } from 'openai';
import { Language } from '../enums';

export interface ITitleRequest {
  title: string;
  language: string;
}

export interface ITitlesRequest {
  keywords: string;
  numberOfTitles: number;
  language: string;
}

export interface ITitleWithParagraphRequest extends ITitleRequest {
  paragraph: string;
}

export interface IContentRequest {
  content: string;
  language: string;
}

export interface IImagesRequest {
  title: string;
  language: string;

  prompt?: string;
  numberOfImages?: number;
}

export interface IVideoScriptScenesRequest {
  articleContent: string;
  length: string;
  language: string;
}

export type IVideoScriptScenesResponse = IVideoScriptSceneResponse[];

export interface IVideoScriptSceneResponse {
  scene: string;
  length: string;
}

export interface IVideoScriptSceneDetailsRequest extends Omit<IVideoScriptScenesRequest, 'length'> {
  scene: string;
  length: string;
}

export interface IVideoScriptSceneDetailsResponse {
  camera: string;
  voiceover: string;
}

export interface ITitleResponse {
  title: string;
}

export type IParagraphsResponse = IParagraphResponse[];

export interface IParagraphResponse {
  paragraph: string;
}

export interface IExcerptResponse {
  excerpt: string;
}

export interface ISeoResponse {
  title: string;
  description: string;
}

export interface IArticleResponse {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image?: ImagesResponse;
}

export interface IFaqResponse {
  question: string;
  answer: string;
}

export interface IImageResponse {
  id: number;
  name: string;
}

export interface IGeneratedArticleResponse {
  article: IArticleResponse;
  seo: ISeoResponse;
  faq: IFaqResponse[];
  images?: ImagesResponse | null;
  videoScript?: string | null;
}

export interface INewJobItem {
  title: string;
  timestamp: number;
  image?: {
    isActive: boolean;
    prompt: string;
  };
  videoScript?: {
    isActive: boolean;
    length: string;
  };
}
export interface INewJobRequest {
  keywords: string;
  language: Language;
  items: INewJobItem[];
}
