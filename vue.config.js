const { defineConfig } = require("@vue/cli-service");

const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = {
  lintOnSave: false,
};
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("monaco").use(new MonacoWebpackPlugin({}));
  },
});
// module.exports = {
//   root: true,
//   env: {
//     node: true,
//   },
//   extends: [
//     "plugin:vue/vue3-essential",
//     "eslint:recommended",
//     "@vue/typescript/recommended",
//     "plugin:prettier/recommended",
//   ],
//   parserOptions: {
//     ecmaVersion: 2020,
//   },
//   rules: {
//     "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
//     "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
//   },
// };

