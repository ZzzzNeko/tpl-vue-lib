const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

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
        loader: "vue-loader",
      },
      // 加载器相关配置
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.sass$/,
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
        use: ["pug-plain-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(png|jpg|gif)/,
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
  ],
};
