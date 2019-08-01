const UmdPlugin = require('./plugins/umd');

module.exports = {
    entry: './src/quagga.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [{
            test: /\.(js|ts)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'quagga.js',
        library: 'Quagga',
        libraryTarget: 'var',
        umdNamedDefine: true
    },
    plugins: [
        new UmdPlugin()
    ],
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            './config/config': './config/config.dev'
        }
    },
    target: 'web',
    devServer: {
        contentBase: './',
        hot: true
    }
};
