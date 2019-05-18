const merge = require('webpack-merge');
const common = require('./webpack.common.js');
console.log('Desarrollo')
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
});
