const Path = require('path');
const Webpack = require('webpack');


const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: Path.resolve(__dirname, '../src/js/app.js')
    },
    output: {
        path: Path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    context: Path.resolve(__dirname, '../src'),

    plugins: [
        new CleanWebpackPlugin('dist', {root: Path.resolve(__dirname, '..')}),
        new CopyWebpackPlugin([
            {
                from: Path.resolve(__dirname, '../src/img'),
                to: Path.resolve(__dirname, '../dist/img'),
            }
        ]),
        // new HtmlWebpackPlugin({
        //     hash: true,
        //     template: Path.resolve(__dirname, '../src/index.html'),
        //     filename: 'index.html'
        // }),
        // new HtmlWebpackPlugin({
        //     template: Path.resolve(__dirname, '../src/page.html'),
        //     filename: 'page.html'
        // }),
        new HtmlWebpackPlugin({
            template: '../src/index.twig',
            filename: 'index.html'
        }),
        new Webpack.ProvidePlugin({
            "$":"jquery",
            "jQuery":"jquery",
            "window.jQuery":"jquery"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
            {
                test: /\.twig$/,
                loader: 'twig-loader'
            },
            // {
            //     test: /\.html/,
            //     include: Path.resolve(__dirname, '../src/templates'),
            //     use: ["raw-loader"]
            // },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            }
        ]
    }

};