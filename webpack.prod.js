const webpack = require('webpack')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
console.log('production')
module.exports = merge(common, {
  plugins:[
    //ignora la carpeta Locale de Moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new BundleAnalyzerPlugin()
  ],
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({ 
  //       compress: {
  //       warnings: false,
  //       screw_ie8: true,
  //       conditionals: true,
  //       unused: true,
  //       comparisons: true,
  //       sequences: true,
  //       dead_code: true,
  //       evaluate: true,
  //       if_return: true,
  //       join_vars: true,
  //       drop_console: true
  //     },
  //     output: {
  //       comments: false,
  //       beautify: false
  //     }
  //   })
  //   ]
  // },
  mode: 'production',
  devtool: 'source-map',
});
