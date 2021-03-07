const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: './src/js/app.js',
    output: {
      path: path.resolve(__dirname, 'public/'),
      filename: 'bundle.js'
    },
    devtool:'eval-source-map',
    devServer: {
      port: 4200,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [ 
              {
              loader: MiniCssExtractPlugin.loader,
              // options: {
              //   publicPath: './public/css',
              // },
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ]
    },
    plugins: [
      // new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'css/[name].css',
        chunkFilename: "[id].css",
      }),
    ],
    watchOptions: {
      ignored: /node_modules/,
    },
}