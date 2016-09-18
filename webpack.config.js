var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var browsers = [
  '> 1%',
  'last 3 versions',
  'iOS >= 6',
  'ie >= 11'
];

var config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:4000',
    'whatwg-fetch',
    './src/app.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'src', 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint-loader'],
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
      }
    ]
  },
  sassLoader: {
    sourceComments: false
  },
  postcss: [
    autoprefixer({ browsers })
  ],
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  }
}

module.exports = config;