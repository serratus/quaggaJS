/* jshint undef: true, unused: true, browser:true, devel: true */
/* global importScripts, self, Locator */

importScripts('../dist/locator.js');
var inputImageWrapper = null;
self.onmessage = function(e) {
    if (e.data.cmd === 'init') {
        inputImageWrapper = e.data.inputImageWrapper;
        init(function() {
            self.postMessage({'event': 'initialized'});
        });
    } else if (e.data.cmd === 'locate') {
        locate(new Uint8Array(e.data.buffer), function(result) {
            self.postMessage({'event': 'located', result: result, buffer : inputImageWrapper.data}, [inputImageWrapper.data.buffer]);
        });
    }
};
function init(cb) {
    Locator.init({
        showCanvas: false,
        showPatches: false,
        showFoundPatches: false,
        showSkeleton: false,
        showLabels: false,
        showPatchLabels: false,
        showRemainingPatchLabels: false,
        boxFromPatches: {
            showTransformed: false,
            showTransformedBox: false,
            showBB: false
        }
    }, {
        inputImageWrapper : inputImageWrapper
    }, cb);
}
function locate(buffer, cb) {
    inputImageWrapper.data = buffer;
    Locator.locate(cb);
}