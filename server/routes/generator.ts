export default [
  {
    method: "POST",
    path: "/title",
    handler: "controller.generateTitle",
  },
  {
    method: "POST",
    path: "/paragraphs",
    handler: "controller.generateParagraphs",
  },
  {
    method: "POST",
    path: "/paragraph",
    handler: "controller.generateParagraph",
  },
  {
    method: "POST",
    path: "/excerpt",
    handler: "controller.generateExcerpt",
  },
  {
    method: "POST",
    path: "/seo",
    handler: "controller.generateSeo",
  },
  {
    method: "POST",
    path: "/faq",
    handler: "controller.generateFaq",
  },
  {
    method: "POST",
    path: "/images",
    handler: "controller.generateImages",
  },
]