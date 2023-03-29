export interface ITitleRequest {
  title: string;
  language: string;
}

export interface ITitleWithParagraphRequest extends ITitleRequest {
  paragraph: string;
}

export interface IContentRequest {
  content: string;
  language: string;
}

export interface ITitleResponse {
  title: string
}

export type IParagraphsResponse = IParagraphResponse[]

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
  content: string;
  excerpt: string;
}

export type IFaqResponse = {
  question: string;
  answer: string;
};

export interface IGeneratedArticleResponse {
  article: IArticleResponse;
  seo: ISeoResponse;
  faq: IFaqResponse[];
}
