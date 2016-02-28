var webpack = require('webpack'),
    path = require('path');

module.exports = require('./webpack.config.js');

module.exports.resolve = {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(__dirname),
    alias: {
        'input_stream': 'lib/input_stream',
        'frame_grabber': 'lib/frame_grabber'
    }
};

module.exports.externals = [
    "get-pixels",
    "gl-matrix",
    "lodash",
    "ndarray",
    "ndarray-linear-interpolate"
];
module.exports.output.libraryTarget = "commonjs2";
module.exports.plugins = [
    new webpack.DefinePlugin({
        ENV: require(path.join(__dirname, './env/', process.env.BUILD_ENV))
    })
];
module.exports.output.path = __dirname + '/lib';
module.exports.output.filename = 'quagga.js';
