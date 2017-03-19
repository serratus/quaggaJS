var Quagga = require('../lib/quagga').default;

var buffer = require('fs').readFileSync('../test/fixtures/code_128/image-001.jpg');

decode(buffer);
function decode(buff){
    Quagga.decodeSingle({
        src: buff,
        numOfWorkers: 0,
        inputStream: {
            mime: "image/jpeg",
            size: 800,
            area: {
                top: "10%",
                right: "5%",
                left: "5%",
                bottom: "10%"
            }
        }
    }, function(result) {
        if (result.codeResult) {
            console.log("result", result.codeResult.code);
        } else {
            console.log("not detected");
        }
    });
}
