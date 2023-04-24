import { Strapi } from '@strapi/strapi';
import { getLanguageCode, IGeneratedArticleResponse, IImagesRequest, Language } from '../../shared';
import { openai } from '../openai/requests';
import utils from '@strapi/utils';
import { uploadToLibrary } from '../utils';

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
    let resImage: string | undefined = undefined;
    const image = article.image;

    if (image) {
      try {
        resImage = (await uploadToLibrary(image.data[0].b64_json, article.slug)) as string;
      } catch (er) {
        console.error(er);
      }
    }

    return await strapi.entityService.create(`api::article.article`, {
      data: {
        locale: languageCode,
        content: {
          image: resImage,
          title: article.title,
          introduction: article.excerpt,
          content: article.content,
          slug: article.slug,
          publishDate: new Date().toISOString(),
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
