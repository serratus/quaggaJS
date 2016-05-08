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

/*eanScanner
    .fromImage('../test/fixtures/ean/image-001.jpg', {size: 640})
    .toPromise().then((result) => {
        console.log(result.codeResult.code);
    }).catch(() => {
        console.log("EAN not found!");
    });

i2of5Scanner
    .fromImage('../test/fixtures/i2of5/image-001.jpg', {size: 800})
    .toPromise().then((result) => {
        console.log(result.codeResult.code);
    }).catch(() => {
        console.log("ITF not found!");
    });
*/

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

code128Scanner
    .fromVideo({
        constraints: {
            width: 1280,
            height: 720,
            facingMode: "environment"
        }
    })
    .addEventListener('detected', (result) => {
        console.log(result);
    });
