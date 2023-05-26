export const GptCron = {
  kind: 'collectionType',
  collectionName: 'gpt-cron',
  info: {
    singularName: 'gpt-cron',
    pluralName: 'gpt-crons',
    displayName: 'GPT CRON',
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
    collection: {
      type: 'string',
    },
    keywords: {
      type: 'text',
    },
    language: {
      type: 'string',
    },
    details: {
      type: 'json',
    },
  },
};
