const 
    { merge } = require('webpack-merge'),
    path = require('path'),
    common = require('./webpack.common.js'),
    Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },
    plugins: [
      new Dotenv({ safe: "./.env.default", systemvars: true })
    ]
});
