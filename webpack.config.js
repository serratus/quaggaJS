var webpack = require('webpack'),
    MyUmdPlugin = require('./plugins/umd');

module.exports = {
    entry: [
        './src/quagga.js'
    ],
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'quagga.js',
        sourceMapFilename: 'quagga.map'
    },
    devServer: {
        contentBase: './',
        hot: true
    },
    plugins: [
        new MyUmdPlugin({
            library: 'Quagga'
        })
    ]
};
