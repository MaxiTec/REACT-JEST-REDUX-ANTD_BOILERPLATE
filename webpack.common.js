const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// Dependencias para usar con Stylus
const nib = require('nib')
const rupture = require('rupture')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './theme.less'), 'utf8'))
module.exports = {
  //los pollifylls se agregan dinamicamente!!!
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  /* Tratar de Evitar  
  externals: {
    jquery: 'jQuery',
    config: JSON.stringify({
      apiUrl: 'http://localhost:8080'
    })
  },
  */
  resolve: {
    extensions: ['*', '.js', '.jsx','.json'],
  },
  //Sobrescribir siempre por Proyecto
  devServer: {
    host: 'localhost',
    port: 8080,
    inline: true,
    // hot: true,
    historyApiFallback: true,//permite Uso de Boton del Navegador
    contentBase: './build',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
      //acepta uso de Json
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      { test: /\.(png|jpg|gif|ico)$/, loader: 'file-loader', options: { name: 'img/[name].[ext]' } },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              use: [nib(), rupture()],
            },
          },
        ],
      },
      { // Agregar para Entorno de produccion Autoprefixer, con POSTCSS
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
              // loader: "less-loader" // compiles Less to CSS
          loader: 'less-loader',
          options: {
            paths: [
              path.resolve(path.join(__dirname, '/'))
            ],
            javascriptEnabled: true,
            modifyVars: themeVariables,
            // plugins: [
            //   globLess
            // ]
          }
        }]
      }
    ],
  },
  //comon chunks para todas las dependencias, importadas dinamicamente o no.
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
};
