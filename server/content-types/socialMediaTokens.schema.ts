import { ESocialMediaProvider, ETokenType } from '../../shared';

export const GptSocialMediaTokens = {
  kind: 'collectionType',
  collectionName: 'gpt-social-media-token',
  info: {
    singularName: 'gpt-social-media-token',
    pluralName: 'gpt-social-media-tokens',
    displayName: 'GPT Social Media Tokens',
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
    provider: {
      type: 'enumeration',
      enum: Object.values(ESocialMediaProvider),
    },
    token: {
      type: 'text',
    },
    tokenType: {
      type: 'enumeration',
      enum: Object.values(ETokenType),
    },
    user: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'admin::user',
    },
  },
};
