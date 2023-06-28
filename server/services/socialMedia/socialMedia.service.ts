import { factories, Strapi } from '@strapi/strapi';
import { CollectionTypeService } from '@strapi/strapi/lib/core-api/service';

import {
  Constant,
  ESocialMediaProvider,
  ETokenType,
  IPublishPostsRequest,
  IGeneratePostContentRequest,
} from '../../../shared';
import { openaiSocialMedia } from '../../openai/requests';
import { getService } from '../../utils';

const socialMediaService = ({ strapi }: { strapi: Strapi }) => ({
  async generatePost(data: IGeneratePostContentRequest) {
    return await openaiSocialMedia.generatePost(data);
  },

  async publishPost(data: IPublishPostsRequest, user: number) {
    const result: any[] = [];

    for (const [provider, shouldPublish] of Object.entries(data.publishOn)) {
      if (!shouldPublish) continue;

      const postToPublish = data.posts[provider];
      if (!postToPublish) continue;

      const { post, additionalData } = postToPublish;
      const service = this.findSpecificService(provider);
      const response = await service.publishPost(post, additionalData, user);

      result.push({
        provider,
        response,
      });

      const isError = response?.status === 'error';

      await strapi.entityService.create(`plugin::${Constant.PLUGIN_NAME}.gpt-social-media-post`, {
        data: {
          post,
          collection: additionalData.collection,
          collectionId: additionalData.collectionId.toString(),
          status: isError ? 'error' : 'success',
          publishDate: new Date(),
          provider,
          log: response,
        },
      });
    }

    return result;
  },

  findSpecificService(provider: ESocialMediaProvider) {
    if (provider === ESocialMediaProvider.LINKEDIN) return getService('linkedinService');
    if (provider === ESocialMediaProvider.TWITTER) return getService('twitterService');
    if (provider === ESocialMediaProvider.FACEBOOK) return getService('facebookService');
  },

  async updateToken(
    token: string,
    provider: ESocialMediaProvider,
    tokenType: ETokenType,
    user: number,
    details?: any
  ) {
    const foundToken = await this.getToken(provider, tokenType, user);

    if (foundToken) {
      return await strapi.entityService.update(
        `plugin::${Constant.PLUGIN_NAME}.gpt-social-media-token`,
        foundToken.id,
        {
          data: {
            token,
            details,
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
          details,
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

export default factories.createCoreService(
  `plugin::${Constant.PLUGIN_NAME}.gpt-social-media-post`,
  socialMediaService
);
