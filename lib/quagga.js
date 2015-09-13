var requirejs = require('requirejs'),
    path = require('path');

requirejs.config({
    "baseUrl" : path.resolve(__dirname, '..', 'src'),
    "paths" : {
        "typedefs" : "typedefs",
        "input_stream": "../lib/input_stream",
        "frame_grabber": "../lib/frame_grabber"
    },
    nodeRequire: require
});
module.exports = requirejs('quagga');
