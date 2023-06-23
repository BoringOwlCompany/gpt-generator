import { Strapi } from '@strapi/strapi';
import {
  getLanguageCode,
  IGeneratedArticleResponse,
  IGeneratedFlashcardResponse,
  IImagesRequest,
  Language,
} from '../../shared';
import { openaiArticles } from '../openai/requests';
import utils from '@strapi/utils';
import { uploadToLibrary } from '../utils';

const { NotFoundError } = utils.errors;

export default ({ strapi }: { strapi: Strapi }) => ({
  async generateImages(data: IImagesRequest) {
    return await openaiArticles.generateImages(data);
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
    videoScript,
  }: IGeneratedArticleResponse & { language: Language }) {
    const languageCode = getLanguageCode(language);

    let resImage: string | undefined = undefined;
    if (article?.image) {
      try {
        resImage = (await uploadToLibrary(article.image.data[0].b64_json, article.slug)) as string;
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
        videoScript,
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

  async saveFlashcard({
    correctAnswer,
    falseAnswers,
    language,
    question,
    tagsIds,
  }: IGeneratedFlashcardResponse & { tagsIds: number[]; language: Language }) {
    const languageCode = getLanguageCode(language);

    const answers = [
      { answer: correctAnswer, isCorrect: true },
      ...falseAnswers.map((answer) => ({ answer, isCorrect: false })),
    ];

    return await strapi.entityService.create(`api::flashcard.flashcard`, {
      data: {
        locale: languageCode,
        tag: tagsIds,
        question,
        answer: correctAnswer,
        testQuestion: question,
        testAnswers: answers.sort(() => Math.random() - 0.5),
      },
    });
  },
});
