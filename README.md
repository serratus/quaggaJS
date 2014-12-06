quaggaJS
========

QuaggaJS is a barcode-scanner entirely written in JavaScript supporting real-time localization and decoding of 
various types of barcodes such as __EAN__ and __CODE128__. The library is also capable of using `getUserMedia` to get direct 
access to the user's camera stream. Although the code relies on heavy image-processing even recent smartphones are 
capable of locating and decoding barcodes in real-time.

Try some [examples](http://serratus.github.io/quaggaJS/examples) and check out the blog post 
([How barcode-localization works in QuaggaJS](http://www.oberhofer.co/how-barcode-localization-works-in-quaggajs/))
if you want to dive deeper into this topic.

![teaser][teaser_left]![teaser][teaser_right]


## Yet another barcode library?

This is not yet another port of the great [zxing][zxing_github] library, but more of an extension to it. 
This implementation features a barcode locator which is capable of finding a barcode-like pattern in an 
image resulting in an estimated bounding box including the rotation. Simply speaking, this reader is invariant 
to scale and rotation, whereas other libraries require the barcode to be aligned with the viewport.


## Requirements

In order to take full advantage of quaggaJS, the browser needs to support the `getUserMedia` API which is 
already implemented in recent versions of Firefox, Chrome and Opera. The API is also available on their 
mobile counterparts installed on Android. Safari and IE do not allow the access to the camera yet, neither 
on desktop, nor on mobile. You can check [caniuse][caniuse_getusermedia] for updates.

In cases where real-time decoding is not needed, or the platform does not support `getUserMedia` QuaggaJS is 
also capable of decoding image-files using the File API or other URL sources.

## Installation

Just clone the repository and include `dist/quagga.js` in your project. You can also build the library yourself 
by simply typing:

```console
> npm install
> grunt
```

## Usage

You can check out the [examples](http://serratus.github.io/quaggaJS/examples) to get an idea of how to use QuaggaJS.
Basically the library exposes the following API:

### Quagga.init(config, callback)

This method initializes the library for a given configuration (see below) and a function which is called
when the loading-process has finished. The initialization process also requests for camera access if real-time
detection is configured.

### Quagga.start()

When the library is initialized, the `start()` method starts the video-stream and begins locating and decoding
the images.

### Quagga.stop()

If the decoder is currently running, after calling `stop()` the decoder does not process any more images.

### Quagga.onDetected(callback)

Registeres a callback function which is triggered whenever a barcode-pattern has been located and decoded
successfully. The callback function is called with the decoded data as the first parameter.

### Quagga.decodeSingle(config, callback)

In contrast to the calls described above, this method does not rely on `getUserMedia` and operates on a
single image instead. The provided callback is the same as in `onDetected` and contains the decoded data
as first parameter.

## Config

The default `config` object is set as followed:

```javascript
{
  inputStream: { name: "Live",
       type: "LiveStream"
  },
  tracking: false,
  debug: false,
  controls: false,
  locate: true,
  visual: {
    show: true
  },
  decoder:{
    drawBoundingBox: true,
    showFrequency: false,
    drawScanline: true,
    showPattern: false,
    readers: [
      'code_128_reader'
    ]
  },
  locator: {
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
  }
}
```

## Examples

The following example takes an image `src` as input and prints the result on the console. 
The decoder is configured to detect _Code128_ barcodes and enables the locating-mechanism for more robust results.

```javascript
Quagga.decodeSingle({
  readers: ['code_128_reader'],
  locate: true, // try to locate the barcode in the image
  src: '/test/fixtures/code_128/image-001.jpg' // or 'data:image/jpg;base64,' + data
}, function(result){
  console.log(result);
});
```

## Tests

Unit Tests can be run with [Karma][karmaUrl] and written using [Mocha][mochaUrl], [Chai][chaiUrl] and [SinonJS][sinonUrl]. Coverage reports are automatically generated in the coverage/ folder.

```console
> npm install
> grunt test
```


[zxing_github]: https://github.com/zxing/zxing
[teaser_left]: https://github.com/serratus/quaggaJS/blob/master/doc/img/mobile-located.png
[teaser_right]: https://github.com/serratus/quaggaJS/blob/master/doc/img/mobile-detected.png
[caniuse_getusermedia]: http://caniuse.com/#feat=stream
[sinonUrl]: http://sinonjs.org/
[chaiUrl]: http://chaijs.com/
[mochaUrl]: https://github.com/mochajs/mocha
[karmaUrl]: http://karma-runner.github.io/
