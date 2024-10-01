require("dotenv").config();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = ({ esm }) => ({
  entry: path.join(__dirname, "src"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "payment-widget.js",
    library: "PaymentWidget",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /index\.css$/i,
        use: ["css-loader"],
      },
      {
        test: /styles\.css$/i,
        use: ["to-string-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
          },
          {
            type: "asset/resource",
            generator: {
              filename: "assets/svg/[name].[hash][ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".html"],
    alias: {
      react: "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
    fallback: {
      vm: false,
      buffer: false,
      stream: false,
      util: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.MERCHANT_API": JSON.stringify(process.env.MERCHANT_API),
      "process.env.SECRET_KEY": JSON.stringify(process.env.SECRET_KEY),
      "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
    }),

    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ],
  devtool: "source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 4000,
  },
  experiments: {
    outputModule: esm,
  },
});
