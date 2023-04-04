import { Strapi } from '@strapi/strapi';
import { getLanguageCode, IGeneratedArticleResponse, IImagesRequest, Language } from '../../shared';
import { openai } from '../openai/requests';
import utils from '@strapi/utils';

const { NotFoundError } = utils.errors;

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateImages(data: IImagesRequest) {
    return await openai.generateImages(data);
  },

  async uploadImage(data: any) {
    if (!data.file) throw new NotFoundError('File not found');

    return await strapi.plugins.upload.services.upload.upload({
      data: {},
      files: data.file,
    });
  },

  async saveArticle({
    article,
    faq,
    seo,
    language,
  }: IGeneratedArticleResponse & { language: Language }) {
    const languageCode = getLanguageCode(language);
    console.log({
      locale: languageCode,
      content: {
        title: article.title,
        introduction: article.excerpt,
        content: article.content,
        slug: '',
      },
      seo: [
        {
          title: seo.title,
          description: seo.description,
          faq,
        },
      ],
    });
    return await strapi.entityService.create(`api::article.article`, {
      data: {
        locale: languageCode,
        content: {
          title: article.title,
          introduction: article.excerpt,
          content: article.content,
          slug: '',
        },
        seo: [
          {
            title: seo.title,
            description: seo.description,
            faq,
          },
        ],
      },
    });
  },
});
