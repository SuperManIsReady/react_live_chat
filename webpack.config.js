const webpack = require("webpack");

module.exports = {

  entry: [
  
    'webpack-dev-server/client?http://ashik-zuch560:8080',

    'webpack/hot/dev-server',

    './src/index.js'
  ],
  
  output: {

    filename: './public/bundle.js'

  },
  module : {

     loaders : [
       {
         	test: /\.js|\.jsx$/,
          loader: 'babel-loader',
          exclude : /(node_modules)/,
          query: {
            presets: ['es2015','react']
          }
       }
   ]
  },

  plugins : [

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin()
  ]
}
