const path = require('path');
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];

const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    // publicPath: '/dist'
});

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
context: resolve(__dirname, 'src'),

    entry: [
        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-dev-server/client?http://localhost:4000',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        resolve(__dirname, 'src/index.js'),
        // the entry point of our app
    ],
    output: {
        // path: path.resolve(__dirname, 'dist'),
        path: resolve(__dirname, 'public'),
        filename: 'bundle.js',
        // publicPath: './'
},

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.sass$/,
        use: cssConfig,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=[name].[ext]&outputPath=images/',
          'image-webpack-loader',
        ],

      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
      },
      {
         test: /\.(ttf|eot)$/,
         loader: 'file-loader&name=fonts/[name].[ext]'
       },

    ]
  },

  devServer: {
          // contentBase: path.join(__dirname, "dist"),
          contentBase: resolve(__dirname, 'public'),
          compress: false,
          port: 8080,
          stats: 'errors-only',
          hot: true,
          publicPath: '/',
          // open: true
      },
      plugins: [
          new HtmlWebpackPlugin({
              title: 'Learning react Redux',
              hash: true,
              template: 'index.html',
          }),
          new ExtractTextPlugin({
              filename: 'css/[name].css',
              disable: !isProd,
              allChunks: true,
          }),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NamedModulesPlugin(),
          new webpack.DefinePlugin({
              'process.env.PRODUCTION': JSON.stringify(isProd),
              // "process.env.DEVELOPMENT": JSON.stringify(dev)
          }),
      ],
  };
