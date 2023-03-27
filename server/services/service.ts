import { Strapi } from "@strapi/strapi";
import { IGeneratedArticleResponse } from "../../shared";
import {
  generateArticle,
  generateArticleFaq,
  generateArticleSEO,
} from "../openai/requests";

export default ({ strapi }: { strapi: Strapi }) => ({
  async generate(data: {
    title: string;
    language: string;
  }): Promise<IGeneratedArticleResponse> {
    const article = await generateArticle(data.title, data.language);
    const seo = await generateArticleSEO(article.content, data.language);
    const faq = await generateArticleFaq(article.content, data.language);

    return {
      article,
      seo,
      faq,
    };
  },
});
