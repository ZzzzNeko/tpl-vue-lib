const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const baseConfig = require("./webpack.base");
const libConfig = require("./vue.lib");

const prodConfig = {
  mode: "production",
  entry: libConfig.appEntry,
  output: libConfig.appOutput,
  plugins: [new CleanWebpackPlugin({})],
  externals: libConfig.appExternals,
};

module.exports = merge(baseConfig, prodConfig);
