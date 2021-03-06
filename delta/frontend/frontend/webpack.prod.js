const path = require("path");
const webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");
const Dotenv = require("dotenv-webpack");
require("dotenv").config();
module.exports = {
  mode: "production",
  context: __dirname,
  entry: "./src/index",
  output: {
    path: path.resolve("./assets/webpack_bundles/"),
    filename: "[name]-[hash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new BundleTracker({ filename: "./webpack-stats.json" }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(
        "https://delta-assignment.herokuapp.com/api/"
      ),
    }),
  ],
};
