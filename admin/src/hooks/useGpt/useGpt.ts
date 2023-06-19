import { useState } from 'react';
import { IStatus } from '../../../../shared';
import { useStatus } from '../useStatus';
import { useArticleGenerator } from './hooks/useArticleGenerator';
import { useMultipleGenerator } from './hooks/useMultipleGenerator';
import { usePublishGenerator } from './hooks/usePublishGenerator';
import { useSocialMediaPublisher } from './hooks/useSocialMediaPublisher';

export interface IGeneratorsProps {
  setStatus: (status: IStatus) => void;
  setStatusMessage: (statusMessage: string) => void;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const useGpt = () => {
  const { isSuccess, isError, isLoading, statusMessage, setStatus, setStatusMessage } = useStatus();
  const [progress, setProgress] = useState(0);

  const { generateArticle, generateImages, generateVideoScript } = useArticleGenerator({
    setProgress,
    setStatus,
    setStatusMessage,
  });

  const { generateItemsForMultipleGenerator } = useMultipleGenerator({
    setProgress,
    setStatus,
    setStatusMessage,
  });

  const { generatePostContent } = usePublishGenerator({
    setProgress,
    setStatus,
    setStatusMessage,
  });

  const { publishPosts } = useSocialMediaPublisher({
    setProgress,
    setStatus,
    setStatusMessage,
  });

  return {
    generateArticle,
    generateImages,
    generateVideoScript,
    generateItemsForMultipleGenerator,
    generatePostContent,
    publishPosts,
    progress,
    isSuccess,
    isError,
    isLoading,
    statusMessage,
  };
};
