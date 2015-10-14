var webpack = require('webpack'),
    MyUmdPlugin = require('./plugins/umd'),
    path = require('path');

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
        extensions: ['', '.js', '.jsx'],
        alias: {
            'input_stream$': path.resolve(__dirname, 'src/input_stream'),
            'frame_grabber$': path.resolve(__dirname, 'src/frame_grabber')
        }
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
