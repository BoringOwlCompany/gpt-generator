export const GptCronLogs = {
  kind: 'collectionType',
  collectionName: 'gpt-cron-logs',
  info: {
    singularName: 'gpt-cron-logs',
    pluralName: 'gpt-cron-logs',
    displayName: 'GPT CRON logs',
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
    }
  },
  attributes: {
    keywords: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  }
};