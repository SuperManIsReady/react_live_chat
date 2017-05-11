var express = require('express');

var expressWs = require('express-ws');

const MyApp = express();

var expressWs = expressWs(express());

var app = expressWs.app;

app.use(function (req, res, next) { return next(); });

var clients = {}, counter = 0;

app.ws('/', function(ws, req, res) {

    clients[++counter] = ws;

    ws.id = counter;

    ws.on('message', function(msg) {

        req.msg = msg;

        console.log(msg)

        for(const id in clients){      

            clients[id].send(msg);
        }

    });

  ws.on('error', function(msg) { console.log('error',msg); });

  ws.on('close', function(msg) { console.log('closed'); delete clients[ws.id];  });

  ws.on('refresh', function(msg){ console.log('Its Running') });

});

app.listen(5596 , function(err,result){	console.log(result); });

MyApp.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");

  res.header("access-control-allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  next();

});