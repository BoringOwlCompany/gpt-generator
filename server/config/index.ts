import { IConfig } from '../../shared';

export default {
  default: {
    multiple: {
      flashcards: true,
      articles: true,
    },
    single: true,
    calendar: true,
    socialMediaPublisher: true,
  },
  validator(config: IConfig) {
    if (!config.gptApiKey) {
      throw new Error('"gptApiKey" config has to be set');
    }

    if (typeof config.multiple !== 'object') {
      throw new Error('"multiple" has to be an object');
    }
    if (typeof config.multiple.articles !== 'boolean') {
      throw new Error('"multiple.articles" has to be a boolean');
    }
    if (typeof config.multiple.flashcards !== 'boolean') {
      throw new Error('"multiple.flashcards" has to be a boolean');
    }

    if (typeof config.single !== 'boolean') {
      throw new Error('"single" has to be a boolean');
    }
    if (typeof config.calendar !== 'boolean') {
      throw new Error('"calendar" has to be a boolean');
    }
    if (typeof config.socialMediaPublisher !== 'boolean') {
      throw new Error('"socialMediaPublisher" has to be a boolean');
    }
  },
};
