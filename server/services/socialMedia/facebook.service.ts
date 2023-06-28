import { Strapi } from '@strapi/strapi';
import axios from 'axios';

import { Constant, ESocialMediaProvider, ETokenType, IAdditionalData } from '../../../shared';
import { ISocialMediaService } from '../../types/general.types';
import { FACEBOOK_BASE_URL, FACEBOOK_ROUTES } from './socialMedia.config';
import { authHeader, getService } from '../../utils';

export default ({ strapi }: { strapi: Strapi }): ISocialMediaService => ({
  getKeys() {
    const {
      socialMedia: {
        facebook: { clientId, clientSecret },
      },
    } = strapi.config.get(`plugin.${Constant.PLUGIN_NAME}`);

    return { clientId, clientSecret };
  },

  async getAccessToken(user: number) {
    try {
      const accessTokenRecord = await getService('socialMediaService').getToken(
        ESocialMediaProvider.FACEBOOK,
        ETokenType.ACCESS,
        user
      );

      if (!accessTokenRecord) throw new Error('Access token not found');

      return accessTokenRecord.token;
    } catch (e) {
      throw new Error(`Cannot fetch access token: ${e.message}`);
    }
  },

  async getPageId(user: number) {
    try {
      const accessTokenRecord = await getService('socialMediaService').getToken(
        ESocialMediaProvider.FACEBOOK,
        ETokenType.ACCESS,
        user
      );

      if (!accessTokenRecord) throw new Error('Access token not found');
      if (accessTokenRecord.details?.pageId) accessTokenRecord.details.pageId;

      const {
        data: { id },
      } = await axiosInstance.get(FACEBOOK_ROUTES.ME, {
        headers: authHeader(accessTokenRecord.token),
      });

      if (!id) throw new Error('Cannot fetch page ID from facebook api');

      await getService('socialMediaService').updateToken(
        accessTokenRecord.token,
        ESocialMediaProvider.FACEBOOK,
        ETokenType.ACCESS,
        user,
        { pageId: id }
      );

      return id;
    } catch (e) {
      if (e.response) {
        console.error(e.response.data);
        throw new Error(`Cannot get pageId: ${e.response.data.error.message}`);
      }

      console.error(e.message);
      throw new Error(`Cannot get pageId: ${e.message}`);
    }
  },

  async publishPost(post: string, { url }: IAdditionalData, user: number) {
    try {
      const accessToken = await this.getAccessToken(user);
      const pageId = await this.getPageId(user);

      const { data } = await axiosInstance.post(
        FACEBOOK_ROUTES.POSTS(pageId),
        {
          message: post,
          link: url,
        },
        {
          headers: authHeader(accessToken),
        }
      );

      return data;
    } catch (e) {
      if (e.response) {
        console.error(e.response.data);
        return {
          status: 'error',
          message: e.response.data.error.message,
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

const axiosInstance = axios.create({
  baseURL: FACEBOOK_BASE_URL,
});
