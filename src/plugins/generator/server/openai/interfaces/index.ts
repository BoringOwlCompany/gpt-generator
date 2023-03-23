export interface IArticleResponse {
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
  title: string;
  article: IArticleResponse;
  seo: ISeoResponse;
  faq: IFaqResponse;
}
