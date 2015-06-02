var Quagga = require('../lib/quagga');

Quagga.decodeSingle({
    src: "../test/fixtures/code_128/image-001.jpg",
    numOfWorkers: 0,
    inputStream: {
        size: 640
    }
}, function(result) {
    if(result.codeResult) {
        console.log("result", result.codeResult.code);
    } else {
        console.log("not detected");
    }
});