quaggaJS
========

QuaggaJS is a barcode-scanner entirely written in JavaScript supporting real-time localization and decoding of various types of barcodes such as EAN and CODE128. The library is also configured to use `getUserMedia` to get direct access to the user's camera stream. Even though the code contains some heavy image-processing parts, recent smartphones are capable of locating and decoding  barcodes in real-time.

![teaser][teaser_image]

## Requirements

In order to take full advantage of quaggaJS, the browser needs to support the `getUserMedia` API which is already implemented by the recent versions of Firefox, Chrome and Opera. The API is also available on their mobile counterparts installed on Android. Safari and IE do not allow the access to the camera yet, neither on desktop, nor on mobile. You can check [caniuse][caniuse_getusermedia] for updates.

In cases where real-time decoding is not needed, or the platform does not support `getUserMedia` QuaggaJS is also capable to decode image-files.

## Installation

Just clone the repository and include `quagga.min.js` in your project. The code uses [requirejs][requirejs] for dependency management.

## Usage

The library exposes the following API

### quagga.init(config, callback)

This method initializes the library for a given configuration and a function which is called when the loading-process has finished. The initialization process also requests for camera access if real-time detection is configured.

### quagga.start()

When the library is initialized, the `start()` method starts the video-stream and begins locating and decoding the images.

### quagga.stop()

If the decoder is currently running, after calling `stop()` the decoder does not process any more images.

### onDetected(callback)

Registeres a callback function which is triggered whenever a barcode-pattern has been located and decoded successfully. The callback function is called with the decoded data as the first parameter.

### decodeSingle(config, callback)

In contrast to the calls described above, this method does not rely on `getUserMedia` and operates on a single image instead. The provided callback is the same as in `onDetected` and contains the decoded data as first parameter.

## Examples

The following example takes an image `src` as input and prints the result on the console. The decoder is configured to detect _Code128_ barcodes and enables the locating-mechanism for more robust results.

```javascript
quagga.decodeSingle({
  readers: [quagga.Reader.Code128Reader],
  locate: true, // try to locate the barcode in the image
  src: src //'data:image/jpg;base64,' + data
}, function(result){
  console.log(result);
});
```

[teaser_image]: https://github.com/serratus/quaggaJS/blob/master/doc/img/quaggaJS-code128.png
[caniuse_getusermedia]: http://caniuse.com/#feat=stream
[requirejs]: http://requirejs.org/
