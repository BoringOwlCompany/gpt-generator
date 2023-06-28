import { Strapi } from '@strapi/strapi';
import { TwitterApi } from 'twitter-api-v2';

import { Constant, ESocialMediaProvider, ETokenType, IAdditionalData } from '../../../shared';
import { twitterClient } from '../../socialMedia/twitter';
import { ISocialMediaService } from '../../types/general.types';
import { getService } from '../../utils';

export default ({ strapi }: { strapi: Strapi }): ISocialMediaService => ({
  getKeys() {
    const {
      socialMedia: {
        twitter: { clientId, clientSecret },
      },
    } = strapi.config.get(`plugin.${Constant.PLUGIN_NAME}`);

    return { clientId, clientSecret };
  },

  async getAccessToken(user: number) {
    try {
      const refreshToken = await getService('socialMediaService').getToken(
        ESocialMediaProvider.TWITTER,
        ETokenType.REFRESH,
        user
      );

      const { clientId, clientSecret } = this.getKeys();
      const { refreshToken: newRefreshToken, accessToken } = await twitterClient(
        clientId,
        clientSecret
      ).refreshOAuth2Token(refreshToken?.token);

      await getService('socialMediaService').updateToken(
        newRefreshToken || '',
        ESocialMediaProvider.TWITTER,
        ETokenType.REFRESH,
        user
      );

      return accessToken;
    } catch (e) {
      if (e.data) {
        throw new Error(`Cannot refresh token: ${e.data.error} - ${e.data.error_description}`);
      }

      throw new Error(`Cannot refresh token: ${e.message}`);
    }
  },

  async publishPost(post: string, { url }: IAdditionalData, user: number) {
    try {
      const accessToken = await this.getAccessToken(user);
      const userClient = new TwitterApi(accessToken);
      return await userClient.v2.tweet(`${post} ${url}`);
    } catch (e) {
      if (e.data) {
        console.error('message', e.data);
        return {
          status: 'error',
          message: e.data.error || e.data.errors.map(({ message }) => message).join(', '),
        };
      }

      console.error(e.message);
      return {
        status: 'error',
        message: e.message,
      };
    }
  },
});
