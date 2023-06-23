import { IAdditionalData } from '../../../../../../../../../../shared';

interface IProps {
  collectionData: any;
}

export const getArticleAdditionalData = ({
  collectionData,
}: IProps): Omit<IAdditionalData, 'collection' | 'collectionId'> => {
  const urlLang = collectionData.locale === 'pl' ? '' : `/${collectionData.locale}`;

  return {
    url: `${process.env.STRAPI_ADMIN_FRONTEND_URL}${urlLang}/blog/${collectionData.content.slug}`,
    imageUrl: collectionData.content.image?.url,
    title: collectionData.content.title,
    description: collectionData.content.introduction,
  };
};
