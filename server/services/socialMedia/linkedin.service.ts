import { Strapi } from '@strapi/strapi';
import axios from 'axios';

import { Constant, ESocialMediaProvider, ETokenType, IAdditionalData } from '../../../shared';
import {
  LINKEDIN_BASE_URL,
  LINKEDIN_REFRESH_TOKEN_URL,
  LINKEDIN_ROUTES,
  LINKEDIN_VALIDATE_TOKEN_URL,
} from './socialMedia.config';
import { ISocialMediaService } from '../../types/general.types';
import { authHeader, getService } from '../../utils';

export default ({ strapi }: { strapi: Strapi }): ISocialMediaService => ({
  getKeys() {
    const {
      socialMedia: {
        linkedin: { clientId, clientSecret },
      },
    } = strapi.config.get(`plugin.${Constant.PLUGIN_NAME}`);

    return { clientId, clientSecret };
  },

  async getAccessToken(user: number) {
    const accessTokenRecord = await getService('socialMediaService').getToken(
      ESocialMediaProvider.LINKEDIN,
      ETokenType.ACCESS,
      user
    );

    if (!accessTokenRecord) {
      await getService('socialMediaService').updateToken(
        '',
        ESocialMediaProvider.LINKEDIN,
        ETokenType.ACCESS,
        user
      );

      return '';
    }

    return accessTokenRecord.token;
  },

  async refreshAccessToken(user: number) {
    try {
      const refreshTokenRecord = await getService('socialMediaService').getToken(
        ESocialMediaProvider.LINKEDIN,
        ETokenType.REFRESH,
        user
      );

      if (!refreshTokenRecord) throw new Error('Refresh token not found');

      const { clientId, clientSecret } = this.getKeys();
      const searchParams = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshTokenRecord.token,
      });

      const {
        data: { access_token },
      } = await axiosInstance.post(LINKEDIN_REFRESH_TOKEN_URL, searchParams, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      await getService('socialMediaService').updateToken(
        access_token,
        ESocialMediaProvider.LINKEDIN,
        ETokenType.ACCESS,
        user
      );

      return access_token;
    } catch (e) {
      if (e.response) {
        const { error, error_description } = e.response.data;
        console.error(e.response.data);
        throw new Error(`Refreshing token error: ${error} - ${error_description}`);
      }

      console.error(e.message);
      throw new Error(`Refreshing token error: ${e.message}`);
    }
  },

  async validateToken(user: number) {
    try {
      let accessToken = await this.getAccessToken(user);

      if (!accessToken) {
        accessToken = await this.refreshAccessToken(user);
      }

      const { clientId, clientSecret } = this.getKeys();
      const searchParams = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        token: accessToken,
      });

      const {
        data: { active },
      } = await axiosInstance.post(LINKEDIN_VALIDATE_TOKEN_URL, searchParams, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (active) return accessToken;

      return await this.refreshAccessToken(user);
    } catch (e) {
      if (e.response) {
        const { error, error_description } = e.response.data;
        console.error(e.response.data);
        throw new Error(`Fetching token error: ${error} - ${error_description}`);
      }

      console.error(e.message);
      throw new Error(`Fetching token error: ${e.message}`);
    }
  },

  async uploadImage(filePath: string, user: number) {
    try {
      const accessToken = await this.getAccessToken(user);
      const author = await this.getAuthor(user);

      const body = {
        initializeUploadRequest: {
          owner: author,
        },
      };

      const {
        data: {
          value: { uploadUrl, image },
        },
      } = await axiosInstance.post(LINKEDIN_ROUTES.FILE_UPLOAD, body, {
        headers: authHeader(accessToken),
      });

      if (!uploadUrl) throw new Error('UploadUrl is missing');

      const fileData = await fetch(filePath).then((res) => res.blob());
      const formData = new FormData();
      formData.append('file', fileData);

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) return image;

      throw new Error('Failed uploading image');
    } catch (e) {
      console.error(e.message);
      throw new Error(`Cannot upload image: ${e.message}`);
    }
  },

  async getAuthor(user: number) {
    const tokenRecord = await getService('socialMediaService').getToken(
      ESocialMediaProvider.LINKEDIN,
      ETokenType.ACCESS,
      user
    );

    if (!tokenRecord) throw new Error('Token not found');
    if (!tokenRecord.details?.author) throw new Error('Author not provided');

    return tokenRecord.details.author;
  },

  async publishPost(
    post: string,
    { description, imageUrl, title, url }: IAdditionalData,
    user: number
  ) {
    try {
      const accessToken = await this.validateToken(user);
      const author = await this.getAuthor(user);
      const articleImageURN = imageUrl ? await this.uploadImage(imageUrl, user) : null;

      const body = {
        author,
        lifecycleState: 'PUBLISHED',
        commentary: post,
        distribution: {
          feedDistribution: 'MAIN_FEED',
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        content: {
          article: {
            source: url,
            title,
            description,
            ...(articleImageURN && { thumbnail: articleImageURN }),
          },
        },
        visibility: 'PUBLIC',
      };

      const { data } = await axiosInstance.post(LINKEDIN_ROUTES.POSTS, body, {
        headers: authHeader(accessToken),
      });

      return data;
    } catch (e) {
      if (e.response) {
        console.error(e.response.data);
        return {
          status: 'error',
          message: e.response.data.message,
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
  baseURL: LINKEDIN_BASE_URL,
  headers: {
    'LinkedIn-Version': '202306',
    'X-Restli-Protocol-Version': '2.0.0',
  },
});
