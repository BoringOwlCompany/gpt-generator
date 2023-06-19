import { Strapi } from '@strapi/strapi';
import { Service } from '..';

import {
  Constant,
  ESocialMediaProvider,
  ETokenType,
  IPublishPostsRequest,
  IGeneratePostContentRequest,
} from '../../../shared';
import { openaiSocialMedia } from '../../openai/requests';

export default ({ strapi }: { strapi: Strapi }) => ({
  async generatePost(data: IGeneratePostContentRequest) {
    return await openaiSocialMedia.generatePost(data);
  },

  async publishPost(data: IPublishPostsRequest, user: number) {
    const result: any[] = [];
    if (data.publishOn[ESocialMediaProvider.TWITTER]) {
      const postToPublish = data.posts[ESocialMediaProvider.TWITTER];

      if (postToPublish) {
        const { post, additionalData } = postToPublish;
        const response = await strapi
          .plugin(Constant.PLUGIN_NAME)
          .service(Service.TWITTER)
          .publishPost(post, additionalData, user);

        result.push({
          provider: ESocialMediaProvider.TWITTER,
          response,
        });
      }
    }

    if (data.publishOn[ESocialMediaProvider.LINKEDIN]) {
      const postToPublish = data.posts[ESocialMediaProvider.LINKEDIN];

      if (postToPublish) {
        const { post, additionalData } = postToPublish;
        const response = await strapi
          .plugin(Constant.PLUGIN_NAME)
          .service(Service.LINKEDIN)
          .publishPost(post, additionalData, user);

        result.push({
          provider: ESocialMediaProvider.LINKEDIN,
          response,
        });
      }
    }

    return result;
  },

  async updateToken(
    token: string,
    provider: ESocialMediaProvider,
    tokenType: ETokenType,
    user: number
  ) {
    const foundToken = await this.getToken(provider, tokenType, user);

    if (foundToken) {
      return await strapi.entityService.update(
        `plugin::${Constant.PLUGIN_NAME}.gpt-social-media-token`,
        foundToken.id,
        {
          data: {
            token,
          },
        }
      );
    }

    return await strapi.entityService.create(
      `plugin::${Constant.PLUGIN_NAME}.gpt-social-media-token`,
      {
        data: {
          token,
          provider,
          tokenType,
          user,
        },
      }
    );
  },

  async getToken(provider: ESocialMediaProvider, tokenType: ETokenType, user: number) {
    const tokens = await strapi.entityService.findMany(
      `plugin::${Constant.PLUGIN_NAME}.gpt-social-media-token`,
      {
        filters: {
          provider,
          tokenType,
          user: {
            id: user,
          },
        },
      }
    );

    if (tokens.length) return tokens[0];

    return null;
  },
});
