const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath:'/',
        filename: 'js/app.js'
    },
    resolve:{
      alias : {
        page: path.resolve(__dirname, 'src/page'),
        component: path.resolve(__dirname, 'src/component'),
        util: path.resolve(__dirname, 'src/util'),
        images:path.resolve(__dirname,'images'),
        service:path.resolve(__dirname, 'src/service')
      }
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }],"transform-decorators-legacy"]
                    }
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './favicon03.ico'
        }),
        new ExtractTextPlugin("css/[name].css"),

        //提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
          name: 'common',
          filename: 'js/base.js'
        })
    ],
    devServer: {
      port: 8086,
      // host:"192.168.129.69",
      historyApiFallback: {
        index: '/dist/index.html'
      },
      proxy: {
        '/manage' : {
          target: 'http://admintest.happymmall.com',
          changeOrigin: true
        },
        '/api' : {
          target: 'http://api.100moo.com',
          // target: 'http://192.168.129.79',
          changeOrigin: true
        }
      }
    }

}

// {
//     PageCount: 0,
//     RowCount: 0,
//     isSuccessful: true,
//     Json: null,
//     Callback: null,
//     Message: null,
//     ContentEncoding: null,
//     ContentType: null,
//     Data : "[{\"CID\":\"1000\",\"USERSN\":6,\"LOGINNAME\":\"jianshe01\",\"LOGINPWD\":\"123456\",\"USERNAME\":\"镇江市市政建设有限公司\",\"ADDRESS\":null,\"LINKTEL\":null,\"LINKMOBILE\":null,\"EMPDEPART\":\"6+建设单位\",\"USERTYPE\":3,\"EMPPOSITION\":null},{\"CID\":\"1000\",\"USERSN\":9,\"LOGINNAME\":\"jianshe02\",\"LOGINPWD\":\"123456\",\"USERNAME\":\"建设单位C\",\"ADDRESS\":\"珠海市南京路\",\"LINKTEL\":\"027-87670512\",\"LINKMOBILE\":\"18723221234\",\"EMPDEPART\":\"6+建设单位\",\"USERTYPE\":3,\"EMPPOSITION\":null},{\"CID\":\"1000\",\"USERSN\":12,\"LOGINNAME\":\"jianshe\",\"LOGINPWD\":\"123456\",\"USERNAME\":\"珠海建设单位公司\",\"ADDRESS\":\"地方路径\",\"LINKTEL\":\"12538444\",\"LINKMOBILE\":\"13871173124\",\"EMPDEPART\":\"6+建设单位\",\"USERTYPE\":3,\"EMPPOSITION\":\"\"}]",
//     "JsonRequestBehavior": 1,
//     "MaxJsonLength": null,
//     "RecursionLimit": null
// }
