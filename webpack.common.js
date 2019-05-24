const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/* Dependencias para usar con Stylus y Antd Framework */
const nib = require('nib');
const rupture = require('rupture');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './theme.less'), 'utf8'));
/* Dependencias para usar con Stylus */
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    publicPath: 'http://localhost:8080/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    inline: true,
    historyApiFallback: true,
    contentBase: './dist',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
      // { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader', 'eslint-loader'] },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        loader: 'file-loader',
        options: { name: 'img/[name].[ext]' },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
              importLoaders: 0,
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              use: [nib(), rupture()],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              paths: [path.resolve(path.join(__dirname, '/'))],
              javascriptEnabled: true,
              modifyVars: themeVariables,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.template.html',
      favicon: './src/static/img/favicon.ico',
      filename: './index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/static',
        to: './',
      },
    ]),
  ],
};
