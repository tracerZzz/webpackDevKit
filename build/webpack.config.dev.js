//开发环境配置文件
var webpack = require('webpack');
var path = require('path');

//html插件  npm install --save-dev html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        //单文件
        //app: "./app.js",
        //多文件 打包之后文件名字为
        // entry: ["babel-polyfill", "./src/entry.js"],
        index: ["./src/index.js"],
    },
    output: {
        //打包输出路径
        path: path.join(__dirname, "../dist/"),
        //打包输出文件名称
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            //es6转码支持
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ["env"] }
                }]

            },
            //css
            //npm install --save-dev css-loader style-loader
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //less
            //npm install --save-dev less-loader less
            {
                test: /\.less$/,
                use: [{
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader" // compiles Less to CSS
                    }

                ]
            },
            //image 
            { test: /\.(jpe?g)$/, use: ["file-loader?limit=10240&mimetype=image/png&name=/imgs/[name].[ext]"] },
            //路径为imgs下，10k以下转换为base64 
            { test: /\.(png|gif|svg|woff|woff2|ttf|otf|eot)$/, use: ["url-loader?limit=10240&mimetype=image/png&name=imgs/[name].[ext]"] },
            // html
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }],
            }
        ]
    },
    resolve: {
        alias: {
            //工具文件目录
            Utilities: path.resolve(__dirname, '../src/utilities/'),

        }

    },
    plugins: [

        //全局库 
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery",
            //_: "lodash",
        }),
        //重复代码抽取为公共部分 插件
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            // (the commons chunk name)
            filename: "js/common.js",
            // (the filename of the commons chunk)

            minChunks: 2,
            // (Modules must be shared between 2 entries) 公共模块必须出现在至少两个文件里才进行抽离

            chunks: ["index"],
            // (Only use these entries)
        }),
        //全局变量定义
        new webpack.DefinePlugin({
            'PROJECT_NAME': JSON.stringify("wepPackDevTool"),
            'SERVICE_URL': JSON.stringify("http://dev.example.com")
        }),

        //制定模板，将js打入模板生成文件
        new HtmlWebpackPlugin({
            filename: './test.html',
            template: path.resolve(__dirname, '../src/index.html'),
            inject: "head",
            xhtml: true,
            chunks: ["common", "index"],
        }),
    ],
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }

}
