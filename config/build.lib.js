const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const baseConfig = require("./webpack.base");
const libConfig = require("./vue.lib");

const prodConfig = {
  mode: "production",
  entry: libConfig.libEntry,
  output: libConfig.libOutput,
  plugins: [new CleanWebpackPlugin({})],
  externals: libConfig.libExternals,
};

module.exports = merge(baseConfig, prodConfig);
