export default [
  {
    method: "POST",
    path: "/",
    handler: "controller.generate",
  },
  {
    method: "POST",
    path: "/save",
    handler: "controller.save",
  },
];
