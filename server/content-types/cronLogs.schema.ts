export const GptCronLogs = {
  kind: 'collectionType',
  collectionName: 'gpt-cron-log',
  info: {
    singularName: 'gpt-cron-log',
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
    },
  },
  attributes: {
    status: {
      type: 'string',
    },
    message: {
      type: 'json',
    },
  },
};
