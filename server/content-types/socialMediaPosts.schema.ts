import { ESocialMediaProvider, EStatus } from '../../shared';

export const GptSocialMediaPosts = {
  kind: 'collectionType',
  collectionName: 'gpt-social-media-post',
  info: {
    singularName: 'gpt-social-media-post',
    pluralName: 'gpt-social-media-posts',
    displayName: 'GPT Social Media Posts',
    description: 'A regular content-type',
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {
    'content-manager': {
      visible: true,
    },
    'content-type-builder': {
      visible: true,
    },
  },
  attributes: {
    post: {
      type: 'text',
    },
    collection: {
      type: 'string',
    },
    collectionId: {
      type: 'string',
    },
    publishDate: {
      type: 'datetime',
    },
    log: {
      type: 'json',
    },
    status: {
      type: 'enumeration',
      enum: Object.values(EStatus),
    },
    provider: {
      type: 'enumeration',
      enum: Object.values(ESocialMediaProvider),
    },
  },
};
