const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack')
const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = merge(common, {
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: "[name].[chunkhash].chunk.js",
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new WorkboxPlugin({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      miniChunks: Infinity,
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
});