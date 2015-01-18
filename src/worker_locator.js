/* jshint undef: true, unused: true, browser:true, devel: true */
/* global importScripts, self, Locator */

importScripts('../dist/locator.js');
var inputImageWrapper,
    config;

self.onmessage = function(e) {
    if (e.data.cmd === 'init') {
        inputImageWrapper = e.data.inputImageWrapper;
        config = e.data.config;

        config.useWorker = false;
        Locator.init(inputImageWrapper, config, function() {
            self.postMessage({'event': 'initialized'});
        });
    } else if (e.data.cmd === 'locate') {
        inputImageWrapper.data = new Uint8Array(e.data.buffer);
        Locator.locate(function(result) {
            self.postMessage({'event': 'located', result: result, buffer : inputImageWrapper.data}, [inputImageWrapper.data.buffer]);
        });
    }
};