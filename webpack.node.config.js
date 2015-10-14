var webpack = require('webpack'),
    path = require('path');

module.exports = require('./webpack.config.js');

module.exports.resolve = {
    extensions: ['', '.js', '.jsx'],
    alias: {
        'input_stream$': path.resolve(__dirname, 'lib/input_stream'),
        'frame_grabber$': path.resolve(__dirname, 'lib/frame_grabber')
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
module.exports.plugins = [];
module.exports.output.path = __dirname + '/lib';
module.exports.output.filename = 'quagga.js';
