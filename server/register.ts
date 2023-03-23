import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
    strapi.customFields.register({
        name: "gpt-generator",
        plugin: "gpt-generator",
        type: "string",
    });
};
