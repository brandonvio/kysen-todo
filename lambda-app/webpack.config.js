module.exports = {
  entry: "./index.ts",
  output: {
    filename: "../build/index.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [{ test: /.tsx?$/, loader: "ts-loader" }],
  },
};
