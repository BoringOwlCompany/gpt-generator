import { useAdditionalDataToPost } from './additionalDataToPost/useAdditionalDataToPost';
import { useCollectionContent } from './collectionContent/useCollectionContent';

export const useFirstStep = () => {
  const collectionContent = useCollectionContent();
  const additionalData = useAdditionalDataToPost();

  return { collectionContent, additionalData };
};
