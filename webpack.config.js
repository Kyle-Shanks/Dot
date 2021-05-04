const path = require('path')

module.exports = {
    target: 'web',
    entry: {
        index: 'src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'dot-audio',
            type: 'umd',
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env',
                    ],
                }
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            src: path.join(__dirname, './src'),
            nodes: path.join(__dirname, './src/nodes'),
        },
    },
}
