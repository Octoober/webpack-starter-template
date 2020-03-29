const
    path = require('path'),
    Webpack = require('webpack'),
    merge = require('webpack-merge'),
    common = require('./webpack.common.js'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    rootDir = your_path => path.resolve(__dirname, your_path)

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-sourcemap',

    output: {
        chunkFilename: 'js/[name].chunk.js'
    },

    devServer: {
        contentBase: rootDir('../src'),
        port: 8080,
        overlay: {
            warnings: true,
            errors: true
        }
    },

    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ],

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            }
        ]
    }
})