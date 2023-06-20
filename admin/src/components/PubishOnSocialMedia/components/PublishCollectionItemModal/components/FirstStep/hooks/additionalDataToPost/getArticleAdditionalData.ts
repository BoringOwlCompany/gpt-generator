import { IAdditionalData } from '../../../../../../../../../../shared';

export const getArticleAdditionalData = (
  modifiedData: any
): Omit<IAdditionalData, 'collection' | 'collectionId'> => ({
  url: `${process.env.STRAPI_ADMIN_FRONTEND_URL}/blog/${modifiedData.content.slug}`,
  imageUrl: modifiedData.content.image?.url,
  title: modifiedData.content.title,
  description: modifiedData.content.introduction,
});
