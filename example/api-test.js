console.log(typeof Quagga);


// creates a new instance!
var code128Scanner = Quagga
    .decoder({readers: ['code_128_reader']})
    .locator({patchSize: 'medium'});

var eanScanner = Quagga
    .decoder({readers: ['ean_reader']})
    .locator({patchSize: 'medium'});

var i2of5Scanner = Quagga
    .decoder({readers: ['i2of5_reader']})
    .locator({patchSize: 'small', halfSample: false});

/* eanScanner
    .fromImage('../test/fixtures/ean/image-001.jpg', {size: 640})
    .toPromise().then((result) => {
        console.log(result.codeResult.code);
    }).catch(() => {
        console.log("EAN not found!");
    });

i2of5Scanner
    .fromImage('../test/fixtures/i2of5/image-001.jpg', {size: 800})
    .addEventListener('detected', (result) => {
        console.log("Detected: " + result.codeResult.code);
    })
    .addEventListener('processed', (result) => {
        console.log("Image Processed");
    })
    .start(); */

/* imageReader.addEventListener('processed', (result) => {
    console.log(result);
}); */

// or

// uses same canvas?
// queue image requests?
/*imageReader = customScanner
    .fromImage('../test/fixtures/ean/image-002.jpg', {size: 640}); */

/*imageReader.addEventListener('processed', (result) => {
    console.log(result.codeResult.code);
});*/

code128Scanner = code128Scanner
    .config({frequency: 2})
    .fromVideo({
        constraints: {
            width: 800,
            height: 600,
            facingMode: "environment"
        }
    });

code128Scanner
    .addEventListener('detected', (result) => {
        console.log(result);
    })
    .addEventListener('processed', result => {
        console.log("Processed");
    })
    .start();
