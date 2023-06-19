import { useTitle } from './titles/useTitle';

interface IOptions {}

export const usePublishCollectionItem = () => {
  const title = useTitle();

  return { title };
};
