import {
  Constant,
  IPublishPostsRequest,
  IPublishPostsResponse,
  Route,
} from '../../../../../shared';
import { request } from '@strapi/helper-plugin';
import { IGeneratorsProps } from '../useGpt';

export const useSocialMediaPublisher = ({
  setStatus,
  setStatusMessage,
  setProgress,
}: IGeneratorsProps) => {
  const publishPosts = async (
    data: IPublishPostsRequest
  ): Promise<IPublishPostsResponse | null> => {
    try {
      setStatus('loading');
      setProgress(0);
      setStatusMessage('Publishing posts');

      const response = await request(`/${Constant.PLUGIN_NAME}${Route.SOCIAL_MEDIA_PUBLISH_POST}`, {
        method: 'POST',
        body: data,
      });

      setStatus('success');
      setStatusMessage('');

      return {
        data: response,
      };
    } catch {
      setStatus('error');
      return null;
    }
  };

  return { publishPosts };
};
