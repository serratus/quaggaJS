console.log(typeof Quagga);


// creates a new instance!
var eanScanner = Quagga
    .decoder({readers: ['ean_reader']})
    .locator({patchSize: 'medium'});

var i2of5Scanner = Quagga
    .decoder({readers: ['i2of5_reader']})
    .locator({patchSize: 'small', halfSample: false});

eanScanner
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

/*var videoScanner = myReader.fromVideo({
    constraints: {
        width: 640,
        height: 480,
        facingMode: "environment"
    }
});

videoScanner.addEventListener('detected', (result) => {
    console.log(result);
});

videoScanner.then((result) => {
    console.log(result);
}); */
