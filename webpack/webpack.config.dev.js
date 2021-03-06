const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const srcDir = 'src';
const outputDir = 'public';

module.exports = {
  devtool: 'eval',
  debug: true,
  entry: {
    app: path.resolve(srcDir, 'main.ts')
  },
  output: {
    path: outputDir,
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[name].[hash].map',
    chunkFilename: '[id].[hash].chunk.js'
  },
  resolve: {
    extensions: ['', '.ts', '.component.ts', '.service.ts', '.js', '.component.html', '.component.less', '.less', '.css']
  },
  module: {
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint' }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader'},
      { test: /\.component\.html$/, loader: 'raw' },
      { test: /\.less$/, loader: 'to-string!css!less' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.(png|gif|jpg)$/, loader: "file?name=images/[name].[ext]" },
      // For font-awesome, created by Turbo87:
      // https://gist.github.com/Turbo87/e8e941e68308d3b40ef6
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" }
    ],
    noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ]
  },
  plugins: [
    new ExtractTextPlugin("[name].[contenthash].css"),
    new WebpackCleanupPlugin({
      exclude: ['index.html']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, 'index.html'),
      inject: true
    })
  ]
};
