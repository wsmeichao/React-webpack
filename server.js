
// var proxy = require('http-proxy-middleware');
var express = require('express');
var bodyParser = require('body-parser');
var app = new express();
app.use(bodyParser.urlencoded({ extended: false }))

/*
* 代理跑通,并且能拿到数据
*/
// var context = '/api';
// var options = {
//     target: 'http://bigmeichao.com/',//目标服务器地址
//     changeOrigin: true,             //虚拟主机网站需要
// }
// var apiProxy =  proxy(context, options);
// app.use(apiProxy);

// parse application/json
app.use(bodyParser.json())
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
var webpack = require('webpack'),
webpackDevMiddleware = require('webpack-dev-middleware'),
webpackHotMiddleware = require('webpack-hot-middleware'),
webpackDevConfig = require('./webpack.config.production.js');
var compiler = webpack(webpackDevConfig);

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {
  // public path should be the same with webpack config
  publicPath: webpackDevConfig.output.publicPath,
  noInfo: true,
  hot:true,
  port:8181,
  inline: true,
  stats: {
      colors: true
  }
}));
app.use(webpackHotMiddleware(compiler));

/*------------------连接数据库配置数据库------------------*/
app.listen(8181, function() {
  console.log('成功启动了');
});

app.post('/api/Page', function(req, res) {
  console.log("query",req.query.init);
  console.log("body",req.body);
  console.log("params",req.params);
  res.send({ message: 'done', newCard: 'newCard' });
});
