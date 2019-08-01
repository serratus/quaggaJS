const config = require('./webpack.config.js');

config.devtool = false;
config.mode = 'production';

config.optimization = config.optimization || {};
config.optimization.minimize = true;

config.output = config.output || {};
config.output.filename = 'quagga.min.js';
config.output.sourceMapFilename = '';

config.resolve = config.resolve || {};
delete config.resolve.alias;

module.exports = config;
