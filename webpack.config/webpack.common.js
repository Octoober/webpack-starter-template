const
    Webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlIncludes = require('./modules/html-includes'),
    rootDir = your_path => require('path').resolve(__dirname, your_path)

module.exports = {
    entry: {
        app: rootDir('../src/js/app.js')
    },

    output: {
        path: rootDir('../dist')
    },

    context: rootDir('../src'),

    plugins: [
        new CleanWebpackPlugin('dist', { root: rootDir('..') }),
        new CopyWebpackPlugin([{
            from: rootDir('../src/img'),
            to: rootDir('../dist/img'),
        }]),
        new Webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
    ].concat(HtmlIncludes),

    module: {
        rules: [{
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
            {
                test: /\.twig$/,
                loader: 'twig-loader'
            },
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