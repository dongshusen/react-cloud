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
            }, {
                test: /\.(gif|png|jpg|ico|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            esModule: false,
                            options: {

                            },
                            name: "[path][name].[hash].[ext]"
                        }
                    }
                ]
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
            // proxy: {
            //     '/ds_service': {
            //         target: env.proxy_host,//代理地址，这里设置的地址会代替axios中设置的baseURLhttp://180.76.135.45:8888
            //         changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
            //     }, '/upload': {
            //         target: env.proxy_host,//代理地址，这里设置的地址会代替axios中设置的baseURLhttp://180.76.135.45:8888
            //         changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
            //     }
            // }
            proxy: [{
                context: [
                    '/ds_service',
                    '/upload',
                    '/img'
                ],
                target: env.proxy_host,//代理地址，这里设置的地址会代替axios中设置的baseURLhttp://180.76.135.45:8888
                changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
            }]
        },
        watchOptions: {
            ignored: /node_modules/
        }
    }
}
