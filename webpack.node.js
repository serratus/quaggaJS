const config = require('./webpack.config.js');

config.externals = [
    'get-pixels',
    'ndarray'
];

config.mode = 'production';

config.module = config.module || {};
config.module.rules = [{
    test: /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            envName: 'node'
        }
    }
}];

config.output = config.output || {};
config.output.filename = 'quagga.node.js';
config.output.libraryTarget = 'umd';

delete config.plugins;

config.resolve = config.resolve || {};
config.resolve.alias = {
    './config/config': './config/config.node',
    './input/frame-grabber': './input/frame-grabber.node',
    './input/image-stream': './input/image-stream.node'
};

config.target = 'node';

module.exports = config;
