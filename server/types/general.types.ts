import { IAdditionalData } from '../../shared';

export interface ISocialMediaService {
  [key: string]: any;
  publishPost: (post: string, additionalData: IAdditionalData, user: number) => any;
}
