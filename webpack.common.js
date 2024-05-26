const 
  webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  Dotenv = require('dotenv-webpack')

module.exports = {
  cache: false,
  entry: [
    './src/app.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/, use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp)$/,
        loader: 'file-loader',
        options: { name: 'assets/img/[name].[ext]' }
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: { name: 'assets/svg/[name].[ext]' }
      },
      {
        test: /\.(txt|xml)$/,
        loader: 'file-loader',
        options: { name: 'assets/raw/[name].[ext]' }
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        options: { name: 'assets/json/[name].[ext]' }
      },
      { 
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'favicon.ico',
      template: 'template.html'
    }),
    new Dotenv({ safe: "./.env.default", systemvars: true })
  ]
};