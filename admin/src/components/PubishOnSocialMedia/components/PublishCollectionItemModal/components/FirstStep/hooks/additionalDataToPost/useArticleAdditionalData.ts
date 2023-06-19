import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { IAdditionalData } from '../../../../../../../../../../shared';

export const useArticleAdditionalData = (): IAdditionalData => {
  const { modifiedData } = useCMEditViewDataManager();

  return {
    url: `${process.env.STRAPI_ADMIN_FRONTEND_URL}/blog/${modifiedData.content.slug}`,
    imageUrl: modifiedData.content.image?.url,
    title: modifiedData.content.title,
    description: modifiedData.content.introduction,
  };
};
