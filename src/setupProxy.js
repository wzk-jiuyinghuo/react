const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/admin-api",
    createProxyMiddleware({
      target: "http://172.168.30.190:48080/admin-api",
      changeOrigin: true,
      pathRewrite: {
        "^/admin-api": "",
      },
    }),
  );
};
