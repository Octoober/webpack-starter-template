const
    Webpack = require('webpack'),
    merge = require('webpack-merge'),
    common = require('./webpack.common.js'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    rootDir = your_path => require('path').resolve(__dirname, your_path)

module.exports = merge(common, {
    mode: 'production',
    devtool: false,

    output: {
        filename: './js/[name].[chunkhash:8].js',
        chunkFilename: './js/[name].[chunkhash:8].chunk.js'
    },

    performance: {
        hints: false
    },

    optimization: {},

    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].[hash].css',
            chunkFilename: './css/[id].[hash].css'
        })
    ],

    module: {
        rules: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(sass|scss)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
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
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
})
