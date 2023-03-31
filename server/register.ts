import { Strapi } from "@strapi/strapi";
import { Constant } from '../shared'

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: Constant.PLUGIN_NAME,
    plugin: Constant.PLUGIN_NAME,
    type: "string",
  });

};
