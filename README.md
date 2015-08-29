quaggaJS
========

- [Changelog](#changelog) (2015-08-29)

## What is QuaggaJS?

QuaggaJS is a barcode-scanner entirely written in JavaScript supporting real-
time localization and decoding of various types of barcodes such as __EAN__,
__CODE 128__, __CODE 39__, __EAN 8__, __UPC-A__, __UPC-C__, __I2of5__ and
__CODABAR__. The library is also capable of using `getUserMedia` to get direct
access to the user's camera stream. Although the code relies on heavy image-
processing even recent smartphones are capable of locating and decoding
barcodes in real-time.

Try some [examples](http://serratus.github.io/quaggaJS/examples) and check out
the blog post ([How barcode-localization works in QuaggaJS][oberhofer_co_how])
if you want to dive deeper into this topic.

![teaser][teaser_left]![teaser][teaser_right]


## Yet another barcode library?

This is not yet another port of the great [zxing][zxing_github] library, but
more of an extension to it. This implementation features a barcode locator which
is capable of finding a barcode-like pattern in an image resulting in an
estimated bounding box including the rotation. Simply speaking, this reader is
invariant to scale and rotation, whereas other libraries require the barcode to
be aligned with the viewport.


## Requirements

In order to take full advantage of quaggaJS, the browser needs to support the
`getUserMedia` API which is already implemented in recent versions of Firefox,
Chrome, IE (Edge) and Opera. The API is also available on their mobile 
counterparts installed on Android (except IE). Safari does not allow the access
to the camera yet, neither on desktop, nor on mobile. You can check 
[caniuse][caniuse_getusermedia] for updates.

In cases where real-time decoding is not needed, or the platform does not
support `getUserMedia` QuaggaJS is also capable of decoding image-files using
the File API or other URL sources.

## Getting Started

You can simply include `dist/quagga.min.js` in your project and you are ready
to go.

If you want to keep your project modular, you can also install QuaggaJS via npm:

```console
> npm install quagga
```

And then import it as dependency in your project:

```javascript
var quagga = require('quagga');
```

For starters, have a look at the [examples][github_examples] to get an idea
where to go from here.

## <a name="Building">Building</a>

You can build the library yourself by simply cloning the repo and typing:

```console
> npm install
> grunt dist
```

This grunt task builds a non optimized version `quagga.js` and a minified
version `quagga.min.js` and places both files in the `dist` folder.

## API

You can check out the [examples][github_examples] to get an idea of how to
use QuaggaJS. Basically the library exposes the following API:

### <a name="quaggainit">Quagga.init(config, callback)</a>

This method initializes the library for a given configuration `config` (see
below) and invokes the `callback(err)` when Quagga has finished its
bootstrapping phase. The initialization process also requests for camera
access if real-time detection is configured. In case of an error, the `err`
parameter is set and contains information about the cause. A potential cause
may be the `inputStream.type` is set to `LiveStream`, but the browser does
not support this API, or simply if the user denies the permission to use the
camera.

```javascript
Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream"
    },
    decoder : {
      readers : ["code_128_reader"]
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });
```

### Quagga.start()

When the library is initialized, the `start()` method starts the video-stream
and begins locating and decoding the images.

### Quagga.stop()

If the decoder is currently running, after calling `stop()` the decoder does not
process any more images. Additionally, if a camera-stream was requested upon
initialization, this operation also disconnects the camera.

### Quagga.onProcessed(callback)

This method registers a `callback(data)` function that is called for each frame
after the processing is done. The `data` object contains detailed information
about the success/failure of the operation. The output varies, depending whether
the detection and/or decoding were successful or not.

### Quagga.onDetected(callback)

Registers a `callback(data)` function which is triggered whenever a barcode-
pattern has been located and decoded successfully. The passed `data` object
contains information about the decoding process including the detected code
which can be obtained by calling `data.codeResult.code`.

### Quagga.decodeSingle(config, callback)

In contrast to the calls described above, this method does not rely on
`getUserMedia` and operates on a single image instead. The provided callback
is the same as in `onDetected` and contains the result `data` object.

### Quagga.offProcessed(handler)

In case the `onProcessed` event is no longer relevant, `offProcessed` removes
the given `handler` from the event-queue.

### Quagga.offDetected(handler)

In case the `onDetected` event is no longer relevant, `offDetected` removes
the given `handler` from the event-queue.

## <a name="resultobject">The result object</a>

The callbacks passed into `onProcessed`, `onDetected` and `decodeSingle`
receive a `data` object upon execution. The `data` object contains the following
information. Depending on the success, some fields may be `undefined` or just
empty.

```javascript
{
  "codeResult": {
    "code": "FANAVF1461710",  // the decoded code as a string
    "format": "code_128", // or code_39, codabar, ean_13, ean_8, upc_a, upc_e
    "start": 355,
    "end": 26,
    "codeset": 100,
    "startInfo": {
      "error": 1.0000000000000002,
      "code": 104,
      "start": 21,
      "end": 41
    },
    "decodedCodes": [{
      "code": 104,
      "start": 21,
      "end": 41
    },
    // stripped for brevity
    {
      "error": 0.8888888888888893,
      "code": 106,
      "start": 328,
      "end": 350
    }],
    "endInfo": {
      "error": 0.8888888888888893,
      "code": 106,
      "start": 328,
      "end": 350
    },
    "direction": -1
  },
  "line": [{
    "x": 25.97278706156836,
    "y": 360.5616435369468
  }, {
    "x": 401.9220519377024,
    "y": 70.87524989906444
  }],
  "angle": -0.6565217179979483,
  "pattern": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, /* ... */ 1],
  "box": [
    [77.4074243622672, 410.9288668804402],
    [0.050203235235130705, 310.53619724086366],
    [360.15706727788256, 33.05711026051813],
    [437.5142884049146, 133.44977990009465]
  ],
  "boxes": [
    [
      [77.4074243622672, 410.9288668804402],
      [0.050203235235130705, 310.53619724086366],
      [360.15706727788256, 33.05711026051813],
      [437.5142884049146, 133.44977990009465]
    ],
    [
      [248.90769330706507, 415.2041489551161],
      [198.9532321622869, 352.62160512937635],
      [339.546160777576, 240.3979259789976],
      [389.5006219223542, 302.98046980473737]
    ]
  ]
}
```

## <a name="configobject">Config</a>

The default `config` object is set as followed:

```javascript
{
  inputStream: { name: "Live",
      type: "LiveStream",
      constraints: {
          width: 640,
          height: 480,
          facing: "environment"
      },
      area: { // defines rectangle of the detection/localization area
          top: "0%",    // top offset
          right: "0%",  // right offset
          left: "0%",   // left offset
          bottom: "0%"  // bottom offset
      },
      singleChannel: false // true: only the red color-channel is read
  },
  tracking: false,
  debug: false,
  controls: false,
  locate: true,
  numOfWorkers: 4,
  visual: {
    show: true
  },
  decoder:{
    drawBoundingBox: false,
    showFrequency: false,
    drawScanline: true,
    showPattern: false,
    readers: [
      'code_128_reader'
    ]
  },
  locator: {
    halfSample: true,
    patchSize: "medium", // x-small, small, medium, large, x-large
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

The following example takes an image `src` as input and prints the result on the
console. The decoder is configured to detect _Code128_ barcodes and enables the
locating-mechanism for more robust results.

```javascript
Quagga.decodeSingle({
    decoder: {
        readers: ["code_128_reader"] // List of active readers
    },
    locate: true, // try to locate the barcode in the image
    src: '/test/fixtures/code_128/image-001.jpg' // or 'data:image/jpg;base64,' + data
}, function(result){
    console.log(result);
});
```

## Tests

Unit Tests can be run with [Karma][karmaUrl] and written using
[Mocha][mochaUrl], [Chai][chaiUrl] and [SinonJS][sinonUrl]. Coverage reports are
automatically generated in the coverage/ folder.

```console
> npm install
> grunt test
```
## Image Debugging

In case you want to take a deeper dive into the inner workings of Quagga, get to
know the _debugging_ capabilities of the current implementation. The various
flags exposed through the `config` object give you the abilily to visualize
almost every step in the processing. Because of the introduction of the
web-workers, and their restriction not to have access to the DOM, the
configuration must be explicitly set to `config.numOfWorkers = 0` in order to
work.

## <a name="resultcollector">ResultCollector</a>

Quagga is not perfect by any means and may produce false positives from time
to time. In order to find out which images produced those false positives,
the built-in ``ResultCollector`` will support you and me helping squashing
bugs in the implementation.

### Creating a ``ResultCollector``

You can easily create a new ``ResultCollector`` by calling its ``create``
method with a configuration.

```javascript
var resultCollector = Quagga.ResultCollector.create({
    capture: true, // keep track of the image producing this result
    capacity: 20,  // maximum number of results to store
    blacklist: [   // list containing codes which should not be recorded
        {code: "3574660239843", format: "ean_13"}],
    filter: function(codeResult) {
        // only store results which match this constraint
        // returns true/false
        // e.g.: return codeResult.format === "ean_13";
        return true;
    }
});
```

### Using a ``ResultCollector``

After creating a ``ResultCollector`` you have to attach it to Quagga by
calling ``Quagga.registerResultCollector(resultCollector)``.

### Reading results

After a test/recording session, you can now print the collected results which
do not fit into a certain schema. Calling ``getResults`` on the
``resultCollector`` returns an ``Array`` containing objects with:

```javascript
{
    codeResult: {}, // same as in onDetected event
    frame: "data:image/png;base64,iVBOR..." // dataURL of the gray-scaled image
}
```

The ``frame`` property is an internal representation of the image and
therefore only available in gray-scale. The dataURL representation allows
easy saving/rendering of the image.

### Comparing results

Now, having the frames available on disk, you can load each single image by
calling ``decodeSingle`` with the same configuration as used during recording
. In order to reproduce the exact same result, you have to make sure to turn
on the ``singleChannel`` flag in the configuration when using ``decodeSingle``.

## <a name="changelog">Changelog</a>

### 2015-08-29
- Improvements
  - Added support for Internet Explorer (only Edge+ supports `getUserMedia`)

### 2015-08-13
- Improvements
  - Added `offProcessed` and `offDetected` methods for detaching event-
  listeners from the event-queue.

### 2015-07-29
- Features
  - Added basic support for [ITF][i2of5_wiki] barcodes (`i2of5_reader`)

### 2015-07-08
- Improvements
  - Parameter tweaking to reduce false-positives significantly (for the
  entire EAN and UPC family)
  - Fixing bug in parity check for UPC-E codes
  - Fixing bug in alignment for EAN-8 codes

### 2015-07-06
- Improvements
  - Added `err` parameter to [Quagga.init()](#quaggainit) callback
  function

### 2015-06-21
- Features
  - Added ``singleChannel`` configuration to ``inputStream`` (in [config]
  (#configobject))
  - Added ``ResultCollector`` functionality (see [ResultCollector]
  (#resultcollector))

### 2015-06-13
- Improvements
  - Added ``format`` property to ``codeResult`` (in [result](#resultobject))

### 2015-06-13
- Improvements
  - Added fixes for ``Code39Reader`` (trailing whitespace was missing)

### 2015-06-09
- Features
  - Introduced the ``area`` property
  - Ability to define a rectangle where localization/decoding should be applied

### 2015-05-20
- Improvements
  - Making EAN and UPC readers even more restrictive
  - Added example using requirejs

### 2015-05-18
- Improvements
  - Making EAN and UPC readers more restrictive
  - Added integration-tests for all barcode-readers

### 2015-05-09
- Improvements
  - Odd image dimensions no longer cause problems

### 2015-04-30
- Features
  - Added support for [UPC-A and UPC-E][upc_wiki] barcodes
  - Added support for [EAN-8][ean_8_wiki] barcodes
- Improvements
  - Added extended configuration to the live-video example
  - Releasing resources when calling ``Quagga.stop()``

### 2015-04-25
- Improvements
  - Added extended configuration to the file-input example
  - Configurable ``patchSize`` for better adjustment to small/medium/large
      barcodes

### 2015-04-16
- Features
  - Added support for [Codabar][codabar_wiki] barcodes

### 2015-03-16
- Improvements
  - now includes minified version (23.3KB gzipped)
  - No need for configuration of script-name any more

### 2015-03-12
- Improvements
  - removed dependency on async.js

### 2015-03-04
- Features
  - Added support for [Code 39][code39_wiki] barcodes

### 2015-01-21
- Features
  - Added support for web-worker (using 4 workers as default, can be changed
  through `config.numOfWorkers`)
  - Due to the way how web-workers are created, the name of the script file
  (`config.scriptName`) should be kept in sync with your actual filename
  - Removed canvas-overlay for decoding (boxes & scanline) which can now be
  easily implemented using the existing API (see example)
- API Changes
In the course of implementing web-workers some breaking changes were
introduced to the API.
  - The `Quagga.init` function no longer receives the callback as part of the
   config but rather as a second argument: `Quagga.init(config, cb)`
  - The callback to `Quagga.onDetected` now receives an object containing
  much more information in addition to the decoded code.(see
  [data](#resultobject))
  - Added `Quagga.onProcessed(callback)` which provides a way to get information
  for each image processed. The callback receives the same `data` object as
  `Quagga.onDetected` does. Depending on the success of the process the `data`
  object might not contain any `resultCode` and/or `box` properties.

[zxing_github]: https://github.com/zxing/zxing
[teaser_left]: https://raw.githubusercontent.com/serratus/quaggaJS/master/doc/img/mobile-located.png
[teaser_right]: https://raw.githubusercontent.com/serratus/quaggaJS/master/doc/img/mobile-detected.png
[caniuse_getusermedia]: http://caniuse.com/#feat=stream
[sinonUrl]: http://sinonjs.org/
[chaiUrl]: http://chaijs.com/
[mochaUrl]: https://github.com/mochajs/mocha
[karmaUrl]: http://karma-runner.github.io/
[code39_wiki]: http://en.wikipedia.org/wiki/Code_39
[codabar_wiki]: http://en.wikipedia.org/wiki/Codabar
[upc_wiki]: http://en.wikipedia.org/wiki/Universal_Product_Code
[ean_8_wiki]: http://en.wikipedia.org/wiki/EAN-8
[oberhofer_co_how]: http://www.oberhofer.co/how-barcode-localization-works-in-quaggajs/
[github_examples]: http://serratus.github.io/quaggaJS/examples
[i2of5_wiki]: https://en.wikipedia.org/wiki/Interleaved_2_of_5
