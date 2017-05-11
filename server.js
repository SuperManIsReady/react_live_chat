const webpack = require("webpack");

const webpackDevServer = require("webpack-dev-server");

const config = require("./webpack.config");

new webpackDevServer(webpack(config),{

  publicPath : config.output.publicPath,

  hot : true,

  historyApiFallback : true

}).listen(8080, "ashik-zuch560", function(err,result){

  if(err){

    console.log(err);
    
  }

  console.log("Listening at ashik-zuch560 : 8080");
  
});
