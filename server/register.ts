import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: "generator",
    plugin: "generator",
    type: "string",
  });
};
