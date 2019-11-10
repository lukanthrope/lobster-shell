const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  }
};