const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const entry = require('./entry')

module.exports = {
    // 手动配置编译上下文
    context:path.resolve(process.cwd(),'src/app'),
    entry:entry,
    watch:true,
    output:{
        // node的启动目录
        path:path.resolve(process.cwd(),'dist'),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"],  
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                  })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                  })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                  })
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
                loader: "file-loader",
                options: {
                    name: 'assets/[name]_[sha512:hash:base64:7].[ext]'
                },  
            },
        ]
    },
    plugins:[
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            template: 'base/webpack.template.html',
            inject: true,
            // 指定引入哪个js
            // chunks:['sale']
        }),
    ]
}