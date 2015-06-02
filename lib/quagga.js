var requirejs = require('requirejs');

requirejs.config({
    "baseUrl" : "../src",
    "paths" : {
        "typedefs" : "typedefs",
        "input_stream": "../lib/input_stream",
        "frame_grabber": "../lib/frame_grabber"
    }
});

module.exports = requirejs('quagga');