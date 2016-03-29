var Quagga = require('../lib/quagga').default;

Quagga.decodeSingle({
    src: "../test/fixtures/code_128/image-001.jpg",
    numOfWorkers: 0,
    inputStream: {
        size: 800,
        area: {
            top: "10%",
            right: "5%",
            left: "5%",
            bottom: "10%"
        }
    }
}, function(result) {
    if(result.codeResult) {
        console.log("result", result.codeResult.code);
    } else {
        console.log("not detected");
    }
});
