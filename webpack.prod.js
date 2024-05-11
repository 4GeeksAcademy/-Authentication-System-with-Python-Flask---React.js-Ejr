const 
    { merge } = require('webpack-merge'),
    common = require('./webpack.common.js'),
    Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: '/'
    },
    plugins: [
        new Dotenv({
            safe: true,
            systemvars: true
        })
    ]
});
