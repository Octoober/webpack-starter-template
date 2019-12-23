module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: ['ie >= 8', 'last 4 version']
        }),
        require('cssnano')
    ]
}