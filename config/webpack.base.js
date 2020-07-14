const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const getResolvePath = (d) => path.resolve(__dirname, d);
const srcResolvePath = getResolvePath("../src");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
    extensions: [".js", ".ts", ".json", ".vue"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.vue$/,
        include: srcResolvePath,
        loader: "vue-loader",
      },
      // 加载器相关配置
      {
        test: /\.css$/,
        // include: srcResolvePath,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        include: srcResolvePath,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.sass$/,
        include: srcResolvePath,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // implementation: require('sass'), 默认
              sassOptions: {
                indentedSyntax: true, // sass 语法默认不支持，需要手动设置
              },
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        include: srcResolvePath,
        use: ["pug-plain-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: srcResolvePath,
        use: ["file-loader"],
      },
      {
        test: /\.(png|jpg|gif)/,
        include: srcResolvePath,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 配置转换大小
              // fallback: 'file-loader' // 默认使用 file-loader
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 插件相关配置
    new webpack.ProgressPlugin({
      activeModules: false,
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "Vue-Lib",
      filename: "index.html",
      template: "public/index.html",
    }),
  ],
};
