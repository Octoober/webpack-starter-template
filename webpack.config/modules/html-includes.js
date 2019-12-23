const
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    fs = require('fs')

let htmlIncludes = []

const getTwigFiles = dir => {
    const files = fs.readdirSync(dir)
    let output = []

    files.forEach(file => {
        if (/\.twig$/g.test(file)) output.push(file.replace(/\.[^/.]+$/, ''))
    })

    return output
}

getTwigFiles('./src/views').forEach(filename => {
    htmlIncludes.push(
        new HtmlWebpackPlugin({
            template: '../src/views/' + filename + '.twig',
            filename: filename + '.html'
        })
    )
})

module.exports = htmlIncludes