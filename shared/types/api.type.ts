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
}

export interface INewJobRequest {
  keywords: string;
  language: Language;
  titles: {
    title: string;
    timestamp: number;
  }[];
}
