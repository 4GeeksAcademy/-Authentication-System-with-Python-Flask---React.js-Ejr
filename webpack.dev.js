const 
  webpack = require('webpack'),
  path = require('path'),
  { merge } = require('webpack-merge'),
  common = require('./webpack.common.js')

const port = 3000
let publicUrl = `ws://localhost:${port}/ws`

//only for codespaces
if(process.env.CODESPACE_NAME){
  publicUrl = `wss://${process.env.CODESPACE_NAME}-${port}.app.github.dev/ws`
}

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        port,
        hot: true,
        allowedHosts: "all",
        historyApiFallback: true,
        static: {
          directory: path.resolve(__dirname, "public"),
        },
        client: {
          webSocketURL: publicUrl
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})
