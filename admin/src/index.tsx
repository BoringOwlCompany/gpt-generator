import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import { Constant } from '../../shared';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `/plugins/${Constant.PLUGIN_NAME}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${Constant.PLUGIN_NAME}.label`,
        defaultMessage: 'Generate multiple articles',
      },
      Component: async () => import('./pages/MainTab'),
    });
    app.customFields.register({
      name: `${Constant.PLUGIN_NAME}`,
      pluginId: `${Constant.PLUGIN_NAME}`,
      type: 'string',
      intlLabel: {
        id: `${Constant.PLUGIN_NAME}.label`,
        defaultMessage: `${Constant.PLUGIN_NAME}`,
      },
      intlDescription: {
        id: `${Constant.PLUGIN_NAME}.description`,
        defaultMessage: `${Constant.PLUGIN_NAME}`,
      },
      components: {
        Input: async () => import('./pages/ArticleContent'),
      },
    });
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name: Constant.PLUGIN_NAME,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
