/**
 * Created by MC on 16/10/16.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: [
        'webpack/hot/dev-server',
        path.resolve(__dirname, './app/routes')
    ],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        // publicPath:'http://localhost:8181/',         //同样可以
        publicPath:'/',
        chunkFilename: "[name].bundle.min.js?ver=[chunkhash]"
    },
    devServer:{
        contentBase: '',  //静态资源的目录 相对路径,相对于当前路径 默认为当前config所在的目录
        devtool: 'eval',
        hot: true,        //自动刷新
        inline: true,    
        port: 8181        
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /^node_modules$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react','stage-0']
                }

            },{ 
                test: /\.(css|scss)$/, 
                loader: ExtractTextPlugin.extract("style", "css!sass!autoprefixer")
            },{
                test: /\.(png|jpg|jpeg|gif|eot|woff|svg|ttf|woff2|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    resolve:{
        extensions: ['', '.js', '.jsx'], //后缀名自动补全
    },
    /* 
    *   HtmlWebpackPlugin 这里会自动生成css和js文件,自己在build文件下创建的css文件和js文件目前未用到,但是先不删除,以防后期有变 
    *   有模板html文件,这样原先的 页面跳转了，title不能改变的问题
    */
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),      //使用uglifyJs压缩js代码
        new webpack.optimize.OccurenceOrderPlugin(),                //按引用频度来排序 ID，以便达到减少文件大小的效果
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        // new ExtractTextPlugin("style.css",{allChunks: true}),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${__dirname}/build/index.html`,
            inject: 'body',
            hash: true
        })
    ]
};