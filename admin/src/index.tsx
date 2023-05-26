import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { Calendar, Component } from '@strapi/icons';

import pluginId from './pluginId';
import Initializer from './components/Initializer';
import { Constant } from '../../shared';
import { GenerateSingle } from './components';

const menuItems = [
  {
    slug: '/articles',
    icon: Calendar,
    label: 'Generate multiple articles',
    Component: async () => import('./pages/GenerateMultipleArticles'),
  },
  {
    slug: '/flashcards',
    icon: Component,
    label: 'Generate multiple flashcards',
    Component: async () => import('./pages/GenerateMultipleFlashcards'),
  },
];

export default {
  register(app: any) {
    menuItems.map(({ Component, icon, label, slug }) => {
      app.addMenuLink({
        to: `/plugins/${Constant.PLUGIN_NAME}${slug}`,
        icon,
        intlLabel: {
          id: `${Constant.PLUGIN_NAME}.label`,
          defaultMessage: label,
        },
        Component,
      });
    });

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name: Constant.PLUGIN_NAME,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'generate-with-ai',
      Component: GenerateSingle,
    });
  },

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
