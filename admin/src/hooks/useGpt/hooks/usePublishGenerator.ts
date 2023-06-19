import {
  ESocialMediaProvider,
  IGeneratedPosts,
  IGeneratePostContentRequest,
} from '../../../../../shared';
import { generateApi } from '../../../api';
import { cumulativeRequests } from '../../../utils/cumulativeRequests';
import { IGeneratorsProps } from '../useGpt';

export const usePublishGenerator = ({
  setStatus,
  setStatusMessage,
  setProgress,
}: IGeneratorsProps) => {
  const generatePostContent = async (
    data: Omit<IGeneratePostContentRequest, 'socialMediaProvider'>
  ) => {
    try {
      setStatus('loading');
      setProgress(0);
      setStatusMessage('Generating posts...');

      const postsToGenerate = Object.entries(data.publishOn)
        .filter(([, value]) => value === true)
        .map(([label]) => label as ESocialMediaProvider);

      const { isError, result } = await cumulativeRequests(generateApi.generateSocialMediaPost, {
        args: postsToGenerate.map((socialMediaProvider) => ({ ...data, socialMediaProvider })),
        onError: () => setStatus('error'),
        onSuccess: () => setProgress((prev) => prev + 1),
      });

      if (isError)
        return {
          posts: {},
        };

      setStatus('success');
      setStatusMessage('');

      return {
        posts: result.reduce(
          (acc, { post }, index) => ({
            ...acc,
            [postsToGenerate[index]]: {
              post,
              additionalData: data.additionalData,
            },
          }),
          {} as IGeneratedPosts
        ),
      };
    } catch {
      setStatus('error');
      return {
        posts: {},
      };
    }
  };

  return { generatePostContent };
};
