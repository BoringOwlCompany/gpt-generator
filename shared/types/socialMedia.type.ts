import { ELength, ESocialMediaProvider, Language } from '../enums';

export type IGeneratedPosts = {
  [key in ESocialMediaProvider]?: {
    post: string;
    additionalData: IAdditionalData;
  };
};

export interface IPublishPostsRequest {
  language: Language;
  prefferedLength: ELength;
  publishOn: {
    [key in ESocialMediaProvider]: boolean;
  };
  posts: IGeneratedPosts;
}

export interface IPublishPostsResponse {
  data: {
    provider: ESocialMediaProvider;
    response: any;
  }[];
}

export interface IGeneratePostContentRequest {
  language: Language;
  prefferedLength: ELength;
  collectionContent: string;
  additionalData: IAdditionalData;
  publishOn: {
    [key in ESocialMediaProvider]: boolean;
  };
  socialMediaProvider: ESocialMediaProvider;
}

export interface IGeneratePostContentResponse {
  post: string;
}

export interface IAdditionalData {
  url?: string;
  imageUrl?: string;
  title?: string;
  description?: string;
}
