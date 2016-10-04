#!/bin/env node
var http = require('http');
var compression = require('compression')
var express = require('express');
var app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(compression({ threshold: 0 }));


app.use(express.static('public'));


/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});
*/
