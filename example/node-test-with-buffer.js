var Quagga = require('../lib/quagga').default;


var buff = require('fs').readFileSync('image-001.jpg');

    decode(buff);
    function decode(buff){
    Quagga.decodeSingle({
        src: buff,
        mime: "image/jpeg",
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
}
