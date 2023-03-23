export interface IArticleResponse {
  title: string;
  content: string;
  excerpt: string;
}

export interface ISeoResponse {
  title: string;
  description: string;
}

export type IFaqResponse = Array<{
  question: string;
  answer: string;
}>;

export interface IGeneratedResponse {
  article: IArticleResponse;
  seo: ISeoResponse;
  faq: IFaqResponse;
}
