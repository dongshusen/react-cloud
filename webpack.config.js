const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

module.exports = (env, argv) => {
    env = env || {};
    env.proxy_host = process.env.npm_config_server || 'http://180.76.235.179:8888';
    return {
        mode: 'development',
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
            }]
        },
        plugins: [
            new htmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html'
            })
        ],
        devServer: {
            port: 3008,
            proxy: {
                context: [
                    '/ds_service',
                    '/upload'
                ],
                target: env.proxy_host,//代理地址，这里设置的地址会代替axios中设置的baseURLhttp://180.76.135.45:8888
                changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
                //ws: true, // proxy websockets
                //pathRewrite方法重写url
                // pathRewrite: {
                //     '^/api': '/'
                //     //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
                //     //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
                // }
            }
        },
        watchOptions: {
            ignored: /node_modules/
        }
    }
}
