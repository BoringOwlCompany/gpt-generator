import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";

const name = pluginPkg.strapi.name;

export default {
    register(app: any) {
        // app.addMenuLink({
        //   to: `/plugins/${pluginId}`,
        //   icon: PluginIcon,
        //   intlLabel: {
        //     id: `${pluginId}.plugin.name`,
        //     defaultMessage: name,
        //   },
        //   Component: async () => {
        //     const component = await import(
        //       /* webpackChunkName: "[request]" */ "./pages/App"
        //     );

        //     return component;
        //   },
        //   permissions: [
        //     // Uncomment to set the permissions of the plugin here
        //     // {
        //     //   action: '', // the action name should be plugin::plugin-name.actionType
        //     //   subject: null,
        //     // },
        //   ],
        // });
        app.customFields.register({
            name: "gpt-generator",
            pluginId: "gpt-generator",
            type: "string",
            intlLabel: {
                id: "gpt-generator.label",
                defaultMessage: "gpt-generator",
            },
            intlDescription: {
                id: "gpt-generator.description",
                defaultMessage: "gpt-generator",
            },
            // …
            components: {
                Input: async () => import("./pages/HomePage"),
            },
            // …
        });
        const plugin = {
            id: pluginId,
            initializer: Initializer,
            isReady: false,
            name,
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
