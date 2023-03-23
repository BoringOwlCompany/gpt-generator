import { Strapi } from "@strapi/strapi";
import { IGeneratedResponse } from "../openai/interfaces";
import {
  generateArticle,
  generateArticleFaq,
  generateArticleSEO,
} from "../openai/requests";

export default ({ strapi }: { strapi: Strapi }) => ({
  async generate(data: {
    title: string;
    language: string;
  }): Promise<IGeneratedResponse> {
    const article = await generateArticle(data.title, data.language);
    const seo = await generateArticleSEO(article.content, data.language);
    const faq = await generateArticleFaq(article.content, data.language);

    return {
      title: data.title,
      article,
      seo,
      faq,
    };
  },

  async save(data: IGeneratedResponse) {
    return await strapi.entityService.create("api::article.article", {
      data: {
        content: {
          title: data.title,
          slug: "",
          introduction: data.article.excerpt,
          content: data.article.content,
        },
        seo: [
          {
            title: data.seo.title,
            description: data.seo.description,
            faq: data.faq,
          },
        ],
      },
    });
  },
});
