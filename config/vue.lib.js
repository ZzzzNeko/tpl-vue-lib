const path = require("path");
const { version, name } = require("../package.json");

module.exports = {
  appEntry: {
    main: path.resolve(__dirname, "../src/dev/index.ts"),
  },
  appOutput: {
    path: path.resolve(__dirname, "../dist/app"),
    filename: "[name].[hash:6].js",
  },
  appExternals: {},

  // ============================================= //

  libEntry: {
    main: path.resolve(__dirname, "../src/lib/index.ts"),
  },
  libOutput: {
    path: path.resolve(__dirname, "../dist/lib"),
    filename: `index.js`,
    library: `${name}`,
    libraryTarget: "umd",
  },
  libExternals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
    },
  },
};
