export interface IGenerateArticleRequest {
  title: string;
  language: string;
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
