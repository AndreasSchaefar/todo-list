const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
      app: path.resolve(__dirname, "src/app.js"),
  },
  devtool: "inline-source-map",
  output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
  },
  devServer: {
      static: path.resolve(__dirname, "dist"),
      open: true,
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "src/temp.html"),
          open: true,
      }),
  ],
}