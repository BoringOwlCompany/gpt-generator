import generator from './generator'

export default [
  ...generator,
  {
    method: "POST",
    path: "/upload-image",
    handler: "controller.uploadImage",
  },
];
