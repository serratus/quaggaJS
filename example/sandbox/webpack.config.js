module.exports = {
    entry: [
        './src/index.js'
    ],
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|quagga\.js)/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        modules: [
            'node_modules'
        ]
    },
    output: {
        path: __dirname + '/static',
        publicPath: '/',
        filename: 'bundle.js'
    }
};
