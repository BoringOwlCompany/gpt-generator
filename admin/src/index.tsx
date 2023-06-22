import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { Calendar, NumberList } from '@strapi/icons';
import { get } from 'lodash';

import pluginId from './pluginId';
import Initializer from './components/Initializer';
import { Constant } from '../../shared';
import { GenerateSingle, PubishOnSocialMedia } from './components';
import { generalApi } from './api/general.api';

const menuItems = [
  {
    slug: '/calendar',
    icon: Calendar,
    label: 'Calendar',
    configKey: 'calendar',
    Component: async () => import('./pages/CalendarPage'),
  },
  {
    slug: '/articles',
    icon: NumberList,
    label: 'Generate multiple articles',
    configKey: 'multiple.articles',
    Component: async () => import('./pages/GenerateMultipleArticles'),
  },
  {
    slug: '/flashcards',
    icon: NumberList,
    label: 'Generate multiple flashcards',
    configKey: 'multiple.flashcards',
    Component: async () => import('./pages/GenerateMultipleFlashcards'),
  },
];

const contentManagerComponents = [
  {
    view: 'editView',
    injectionZone: 'right-links',
    name: 'generate-with-ai',
    configKey: 'single.articles',
    Component: GenerateSingle,
  },
  {
    view: 'editView',
    injectionZone: 'right-links',
    name: 'publish-on-social-media',
    configKey: 'socialMediaPublisher',
    Component: PubishOnSocialMedia,
  },
];

export default {
  async register(app: any) {
    const config = await generalApi.fetchConfig();

    menuItems.forEach(({ Component, icon, label, slug, configKey }) => {
      if (!get(config, configKey)) return;

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

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name: Constant.PLUGIN_NAME,
    });
  },

  async bootstrap(app: any) {
    const config = await generalApi.fetchConfig();
    console.log(config);

    contentManagerComponents.forEach(({ Component, injectionZone, name, view, configKey }) => {
      if (!get(config, configKey)) return;

      app.injectContentManagerComponent(view, injectionZone, {
        name,
        Component,
      });
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
