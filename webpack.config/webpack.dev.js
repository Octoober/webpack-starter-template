const
    path = require('path'),
    Webpack = require('webpack'),
    merge = require('webpack-merge'),
    common = require('./webpack.common.js'),
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
                test: /\.(sass|scss)$/,
                use: [{
                        loader: 'style-loader',
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
                        loader: 'sass-loader',
                    }
                ]
            }
        ]
    }
})