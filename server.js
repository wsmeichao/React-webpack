/*
*	created by MC on 2017/2/6
*	待定，需要加上代理，然后前后端互通起来
*/

/*
*	webpack代理

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

//启动服务
new WebpackDevServer(webpack(config), {
  	publicPath: config.output.publicPath,
  	hot: true,
  	proxy: [{
  		path:'/api/*',
  		target: 'http://bigmeichao.com',
        host: 'bigmeichao.com'
	}],
	stats: {
        colors: require('supports-color')
    },
}).listen(8181);

*/

var express = require('express');
var bodyParser = require('body-parser');
var app = new express();
app.use(bodyParser.urlencoded({ extended: false }))

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
webpackDevConfig = require('./webpack.config.js');
var compiler = webpack(webpackDevConfig);

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    hot:true,
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
    console.log(req.body);
    res.send({ message: 'done', newCard: 'newCard' });
});
