import { Strapi } from '@strapi/strapi';
import { Service } from '..';
import axios from 'axios';

import { Constant, ESocialMediaProvider, ETokenType, IAdditionalData } from '../../../shared';
import {
  LINKEDIN_BASE_URL,
  LINKEDIN_ROUTES,
  LINKEDIN_VALIDATE_TOKEN_URL,
} from './socialMedia.config';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAccessToken(user: number) {
    const accessTokenRecord = await strapi
      .plugin(Constant.PLUGIN_NAME)
      .service(Service.SOCIAL_MEDIA)
      .getToken(ESocialMediaProvider.LINKEDIN, ETokenType.ACCESS, user);

    if (!accessTokenRecord) {
      await strapi
        .plugin(Constant.PLUGIN_NAME)
        .service(Service.SOCIAL_MEDIA)
        .updateToken('', ESocialMediaProvider.LINKEDIN, ETokenType.ACCESS, user);

      return '';
    }

    return accessTokenRecord.token;
  },

  async validateToken(user: number) {
    try {
      const accessToken = await this.getAccessToken(user);
      const searchParams = new URLSearchParams({
        client_id: `${process.env.LINKEDIN_CLIENT_ID}`,
        client_secret: `${process.env.LINKEDIN_CLIENT_SECRET}`,
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

      throw new Error('Token expired');
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
    try {
      const accessToken = await this.getAccessToken(user);

      const {
        data: { id },
      } = await axiosInstance.get(LINKEDIN_ROUTES.ME, {
        headers: authHeader(accessToken),
      });

      return `urn:li:person:${id}`;
    } catch (e) {
      if (e.response) {
        console.error(e.response.data);
        throw new Error(`Cannot get author: ${e.response.data.message}`);
      }

      console.error(e.message);
      throw new Error(`Cannot get author: ${e.message}`);
    }
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

const authHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});
