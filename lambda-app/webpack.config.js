const path = require("path");
const SRC_DIR = path.resolve(__dirname, "dist");
const OUT_DIR = path.resolve(__dirname, "build");

const config = {
  entry: {
    index: path.resolve(SRC_DIR, "index.js"),
  },
  externals: ["aws-sdk"],
  output: {
    path: OUT_DIR,
    filename: "[name].js",
    library: "[name]",
    libraryTarget: "umd",
  },
  target: "node",
};

module.exports = config;
