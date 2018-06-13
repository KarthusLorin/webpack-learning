const path = require('path')

module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].[hash:5].js'
    }
}