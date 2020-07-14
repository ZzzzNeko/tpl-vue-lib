const webpack = require("webpack");
const { merge } = require("webpack-merge");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const baseConfig = require("./webpack.base");
const libConfig = require("./vue.lib");

const devConfig = {
  mode: "development",
  entry: libConfig.appEntry,
  output: libConfig.appOutput,
  // externals: libConfig.appExternals,
  devtool: "cheap-module-eval-source-map", // source map 相关配置
  devServer: {
    hot: true,
    stats: {
      all: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      color: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR 插件
    new webpack.NamedModulesPlugin(), // 开启 HMR 时显示模块相对路径
    new FriendlyErrorsPlugin(),
  ],
};

module.exports = merge(baseConfig, devConfig);
