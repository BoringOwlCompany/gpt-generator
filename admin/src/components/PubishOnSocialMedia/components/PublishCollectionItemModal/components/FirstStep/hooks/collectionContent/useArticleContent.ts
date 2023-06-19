import { useCMEditViewDataManager } from '@strapi/helper-plugin';

export const useArticleContent = () => {
  const { modifiedData } = useCMEditViewDataManager();

  return modifiedData.content.content as string;
};
