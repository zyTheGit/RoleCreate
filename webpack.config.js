var path = require('path');
module.exports = {
    mode: 'development',//production,development
    entry: './src/role',
    output: {
        path: path.resolve('dest'),
        filename: 'role.bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
            }]
        }]
    }
}