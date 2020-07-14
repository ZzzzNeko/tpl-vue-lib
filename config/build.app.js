const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const baseConfig = require("./webpack.base");
const libConfig = require("./vue.lib");

const prodConfig = {
  mode: "production",
  entry: libConfig.appEntry,
  output: libConfig.appOutput,
  externals: libConfig.appExternals,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Vue-Lib",
      filename: "index.html",
      template: "public/index.html",
    }),
  ],
};

module.exports = merge(baseConfig, prodConfig);
