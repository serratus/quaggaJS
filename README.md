quaggaJS
========

[![Join the chat at https://gitter.im/quaggaJS/Lobby](https://badges.gitter.im/quaggaJS/Lobby.svg)](https://gitter.im/quaggaJS/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

- [Changelog](#changelog) (2017-06-07)
- [Browser Support](#browser-support)
- [Installing](#installing)
- [Getting Started](#gettingstarted)
- [API](#api)
- [Configuration](#configobject)
- [Tips & Tricks](#tipsandtricks)
- [Sponsors](#sponsors)

## What is QuaggaJS?

QuaggaJS is a barcode-scanner entirely written in JavaScript supporting real-
time localization and decoding of various types of barcodes such as __EAN__,
__CODE 128__, __CODE 39__, __EAN 8__, __UPC-A__, __UPC-C__, __I2of5__,
__2of5__, __CODE 93__ and __CODABAR__. The library is also capable of using
`getUserMedia` to get direct access to the user's camera stream. Although the
code relies on heavy image-processing even recent smartphones are capable of
locating and decoding barcodes in real-time.

Try some [examples](https://serratus.github.io/quaggaJS/examples) and check out
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


## <a name="browser-support">Browser Support</a>

Quagga makes use of many modern Web-APIs which are not implemented by all
browsers yet. There are two modes in which Quagga operates: 1. analyzing static
images and 2. using a camera to decode the images from a live-stream. The latter
requires the presence of the MediaDevices API. You can track the compatibility
of the used Web-APIs for each mode:

- [Static Images](http://caniuse.com/#feat=webworkers,canvas,typedarrays,bloburls,blobbuilder)
- [Live Stream](http://caniuse.com/#feat=webworkers,canvas,typedarrays,bloburls,blobbuilder,stream)

### Static Images

The following APIs need to be implemented in your browser:
- [webworkers](http://caniuse.com/#feat=webworkers)
- [canvas](http://caniuse.com/#feat=canvas)
- [typedarrays](http://caniuse.com/#feat=typedarrays)
- [bloburls](http://caniuse.com/#feat=bloburls)
- [blobbuilder](http://caniuse.com/#feat=blobbuilder)

### Live Stream

In addition to the APIs mentioned above:
- [MediaDevices](http://caniuse.com/#feat=stream)

__Important:__ Accessing `getUserMedia` requires a secure origin in most
browsers, meaning that `http://` can only be used on `localhost`. All other
hostnames need to be served via `https://`. You can find more information in the
[Chrome M47 WebRTC Release Notes](https://groups.google.com/forum/#!topic/discuss-webrtc/sq5CVmY69sc).

### Feature-detection of getUserMedia

Every browser seems to differently implement the `mediaDevices.getUserMedia`
API. Therefore it's highly recommended to include
[webrtc-adapter](https://github.com/webrtc/adapter) in your project.

Here's how you can test your browser's capabilities:

```javascript
if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
  // safely access `navigator.mediaDevices.getUserMedia`
}
```

The above condition evaluates to:

| Browser       | result  |
| ------------- |:-------:|
| Edge          | `true`  |
| Chrome        | `true`  |
| Firefox       | `true`  |
| IE 11         | `false` |
| Safari iOS    | `false` |

## <a name="installing">Installing</a>

QuaggaJS can be installed using __npm__, __bower__, or by including it with
the __script__ tag.

### NPM

```console
> npm install quagga
```

And then import it as dependency in your project:

```javascript
import Quagga from 'quagga'; // ES6
const Quagga = require('quagga').default; // Common JS (important: default)
```

Currently, the full functionality is only available through the browser. When
using QuaggaJS within __node__, only file-based decoding is available. See the
example for [node_examples](#node-example).

### Bower

You can also install QuaggaJS through __bower__:

```console
> bower install quagga
```

### Script-Tag Anno 1998

You can simply include `dist/quagga.min.js` in your project and you are ready
to go. The script exposes the library on the global namespace under `Quagga`.


## <a name="gettingstarted">Getting Started</a>

For starters, have a look at the [examples][github_examples] to get an idea
where to go from here.


## <a name="Building">Building</a>

You can build the library yourself by simply cloning the repo and typing:

```console
> npm install
> npm run build
```

This npm script builds a non optimized version `quagga.js` and a minified
version `quagga.min.js` and places both files in the `dist` folder.
Additionally, a `quagga.map` source-map is placed alongside these files. This
file is only valid for the non-uglified version `quagga.js` because the
minified version is altered after compression and does not align with the map
file any more.

### Node

The code in the `dist` folder is only targeted to the browser and won't work in
node due to the dependency on the DOM. For the use in node, the `build` command
also creates a `quagga.js` file in the `lib` folder.

## <a name="api">API</a>

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

If you do not specify a target, QuaggaJS would look for an element that matches
the CSS selector `#interactive.viewport` (for backwards compatibility).
`target` can be a string (CSS selector matching one of your DOM node) or a DOM
node.

```javascript
Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
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

## <a name="configobject">Configuration</a>

The configuration that ships with QuaggaJS covers the default use-cases and can
be fine-tuned for specific requirements.

The configuration is managed by the `config` object defining the following
high-level properties:

```javascript
{
  numOfWorkers: 4,
  locate: true,
  inputStream: {...},
  frequency: 10,
  decoder:{...},
  locator: {...},
  debug: false,
}
```

### numOfWorkers

QuaggaJS supports web-workers out of the box and runs with `4` workers in its
default configuration. The number should align with the number of cores
available in your targeted devices.

In case you don't know the number upfront, or if the variety of devices is
too big, you can either use `navigator.hardwareConcurrency` (see
[here](https://wiki.whatwg.org/wiki/Navigator_HW_Concurrency)) where available
or make use of [core-estimator](https://github.com/oftn/core-estimator).

### locate

One of the main features of QuaggaJS is its ability to locate a barcode in a
given image. The `locate` property controls whether this feature is turned on
(default) or off.

Why would someone turn this feature off? Localizing a barcode is a
computationally expensive operation and might not work properly on some
devices. Another reason would be the lack of auto-focus producing blurry
images which makes the localization feature very unstable.

However, even if none of the above apply, there is one more case where it might
be useful to disable `locate`: If the orientation, and/or the approximate
position of the barcode is known, or if you want to guide the user through a
rectangular outline. This can increase performance and robustness at the same
time.

### inputStream

The `inputStream` property defines the sources of images/videos within QuaggaJS.

```javascript
{
  name: "Live",
  type: "LiveStream",
  constraints: {
    width: 640,
    height: 480,
    facingMode: "environment",
    deviceId: "7832475934759384534"
  },
  area: { // defines rectangle of the detection/localization area
    top: "0%",    // top offset
    right: "0%",  // right offset
    left: "0%",   // left offset
    bottom: "0%"  // bottom offset
  },
  singleChannel: false // true: only the red color-channel is read
}
```

First, the `type` property can be set to three different values:
`ImageStream`, `VideoStream`, or `LiveStream` (default) and should be selected
depending on the use-case. Most probably, the default value is sufficient.

Second, the `constraint` key defines the physical dimensions of the input image
and additional properties, such as `facingMode` which sets the source of the
user's camera in case of multiple attached devices. Additionally, if required,
the `deviceId` can be set if the selection of the camera is given to the user.
This can be easily achieved via
[MediaDevices.enumerateDevices()][enumerateDevices]

Thirdly, the `area` prop restricts the decoding area of the image. The values
are given in percentage, similar to the CSS style property when using
`position: absolute`. This `area` is also useful in cases the `locate` property
is set to `false`, defining the rectangle for the user.

The last key `singleChannel` is only relevant in cases someone wants to debug
erroneous behavior of the decoder. If set to `true` the input image's red
color-channel is read instead of calculating the gray-scale values of the
source's RGB. This is useful in combination with the `ResultCollector` where
the gray-scale representations of the wrongly identified images are saved.

### frequency

This top-level property controls the scan-frequency of the video-stream. It's
optional and defines the maximum number of scans per second. This renders
useful for cases where the scan-session is long-running and resources such as
CPU power are of concern.

### decoder

QuaggaJS usually runs in a two-stage manner (`locate` is set to `true`) where,
after the barcode is located, the decoding process starts. Decoding is the
process of converting the bars into its true meaning. Most of the configuration
options within the `decoder` are for debugging/visualization purposes only.

```javascript
{
  readers: [
    'code_128_reader'
  ],
  debug: {
      drawBoundingBox: false,
      showFrequency: false,
      drawScanline: false,
      showPattern: false
  }
  multiple: false
}
```

The most important property is `readers` which takes an array of types of
barcodes which should be decoded during the session. Possible values are:

- code_128_reader (default)
- ean_reader
- ean_8_reader
- code_39_reader
- code_39_vin_reader
- codabar_reader
- upc_reader
- upc_e_reader
- i2of5_reader
- 2of5_reader
- code_93_reader

Why are not all types activated by default? Simply because one should
explicitly define the set of barcodes for their use-case. More decoders means
more possible clashes, or false-positives. One should take care of the order
the readers are given, since some might return a value even though it is not
the correct type (EAN-13 vs. UPC-A).

The `multiple` property tells the decoder if it should continue decoding after
finding a valid barcode.  If multiple is set to `true`, the results will be
returned as an array of result objects.  Each object in the array will have a
`box`, and may have a `codeResult` depending on the success of decoding the
individual box.

The remaining properties `drawBoundingBox`, `showFrequency`, `drawScanline` and
`showPattern` are mostly of interest during debugging and visualization.

#### <a name="ean_extended">Enabling extended EAN</a>

The default setting for `ean_reader` is not capable of reading extensions such
as [EAN-2](https://en.wikipedia.org/wiki/EAN_2) or
[EAN-5](https://en.wikipedia.org/wiki/EAN_5). In order to activate those
supplements you have to provide them in the configuration as followed:

```javascript
decoder: {
    readers: [{
        format: "ean_reader",
        config: {
            supplements: [
                'ean_5_reader', 'ean_2_reader'
            ]
        }
    }]
}
```

Beware that the order of the `supplements` matters in such that the reader stops
decoding when the first supplement was found. So if you are interested in EAN-2
and EAN-5 extensions, use the order depicted above.

It's important to mention that, if supplements are supplied, regular EAN-13
codes cannot be read any more with the same reader. If you want to read EAN-13
with and without extensions you have to add another `ean_reader` reader to the
configuration.

### locator

The `locator` config is only relevant if the `locate` flag is set to `true`.
It controls the behavior of the localization-process and needs to be adjusted
for each specific use-case. The default settings are simply a combination of
values which worked best during development.

Only two properties are relevant for the use in Quagga (`halfSample` and
`patchSize`) whereas the rest is only needed for development and debugging.


```javascript
{
  halfSample: true,
  patchSize: "medium", // x-small, small, medium, large, x-large
  debug: {
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

The `halfSample` flag tells the locator-process whether it should operate on an
image scaled down (half width/height, quarter pixel-count ) or not. Turning
`halfSample` on reduces the processing-time significantly and also helps
finding a barcode pattern due to implicit smoothing.
It should be turned off in cases where the barcode is really small and the full
resolution is needed to find the position. It's recommended to keep it turned
on and use a higher resolution video-image if needed.

The second property `patchSize` defines the density of the search-grid. The
property accepts strings of the value `x-small`, `small`, `medium`, `large` and
`x-large`. The `patchSize` is proportional to the size of the scanned barcodes.
If you have really large barcodes which can be read close-up, then the use of
`large` or `x-large` is recommended. In cases where the barcode is further away
from the camera lens (lack of auto-focus, or small barcodes) then it's advised
to set the size to `small` or even `x-small`. For the latter it's also
recommended to crank up the resolution in order to find a barcode.

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
    if(result.codeResult) {
        console.log("result", result.codeResult.code);
    } else {
        console.log("not detected");
    }
});
```

### <a name="node-example">Using node</a>

The following example illustrates the use of QuaggaJS within a node
environment. It's almost identical to the browser version with the difference
that node does not support web-workers out of the box. Therefore the config
property `numOfWorkers` must be explicitly set to `0`.

```javascript
var Quagga = require('quagga').default;

Quagga.decodeSingle({
    src: "image-abc-123.jpg",
    numOfWorkers: 0,  // Needs to be 0 when used within node
    inputStream: {
        size: 800  // restrict input-size to be 800px in width (long-side)
    },
    decoder: {
        readers: ["code_128_reader"] // List of active readers
    },
}, function(result) {
    if(result.codeResult) {
        console.log("result", result.codeResult.code);
    } else {
        console.log("not detected");
    }
});
```

## <a name="tipsandtricks">Tips & Tricks</a>

A growing collection of tips & tricks to improve the various aspects of Quagga.

### Barcodes too small?

Barcodes too far away from the camera, or a lens too close to the object
result in poor recognition rates and Quagga might respond with a lot of
false-positives.

Starting in Chrome 59 you can now make use of `capabilities` and directly
control the zoom of the camera. Head over to the
[web-cam demo](https://serratus.github.io/quaggaJS/examples/live_w_locator.html)
and check out the __Zoom__ feature.

You can read more about those `capabilities` in
[Let's light a torch and explore MediaStreamTrack's capabilities](https://www.oberhofer.co/mediastreamtrack-and-its-capabilities)

### Video too dark?

Dark environments usually result in noisy images and therefore mess with the
recognition logic.

Since Chrome 59 you can turn on/off the __Torch__ of our device and vastly
improve the quality of the images. Head over to the
[web-cam demo](https://serratus.github.io/quaggaJS/examples/live_w_locator.html)
and check out the __Torch__ feature.

To find out more about this feature [read on](https://www.oberhofer.co/mediastreamtrack-and-its-capabilities).

## Tests

Unit Tests can be run with [Karma][karmaUrl] and written using
[Mocha][mochaUrl], [Chai][chaiUrl] and [SinonJS][sinonUrl]. Coverage reports are
automatically generated in the coverage/ folder.

```console
> npm install
> npm run test
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

## <a name="sponsors">Sponsors</a>

- [Maintenance Connection Canada (Asset Pro Solutions Inc.](http://maintenanceconnection.ca/)

## <a name="changelog">Changelog</a>

### 2017-06-07
- Improvements
  - added `muted` and `playsinline` to `<video/>` to make it work for Safari 11
  Beta (even iOS)
- Fixes
  - Fixed  [example/live_w_locator.js](https://github.com/serratus/quaggaJS/blob/master/example/live_w_locator.js)

### 2017-06-06
- Features
  - Support for Standard 2of5 barcodes (See
      [\#194](https://github.com/serratus/quaggaJS/issues/194))
  - Support for Code 93 barcodes (See
      [\#194](https://github.com/serratus/quaggaJS/issues/195))
  - Exposing `Quagga.CameraAccess.getActiveTrack()` to get access to the
      currently used `MediaStreamTrack`
    - Example can be viewed here: [example/live_w_locator.js](https://github.com/serratus/quaggaJS/blob/master/example/live_w_locator.js) and a [demo](https://serratus.github.io/quaggaJS/examples/live_w_locator.html)

Take a look at the release-notes (
    [0.12.0](https://github.com/serratus/quaggaJS/releases/tag/v0.12.0))

### 2017-01-08
- Improvements
  - Exposing `CameraAccess` module to get access to methods like
    `enumerateVideoDevices` and `getActiveStreamLabel`
    (see `example/live_w_locator`)
  - Update to webpack 2.2 (API is still unstable)

### 2016-10-03
- Fixes
  - Fixed `facingMode` issue with Chrome >= 53 (see [#128](https://github.com/serratus/quaggaJS/issues/128))

### 2016-08-15
- Features
  - Proper handling of EXIF orientation when using `Quagga.decodeSingle`
  (see [#121](https://github.com/serratus/quaggaJS/issues/121))

### 2016-04-24
- Features
  - EAN-13 extended codes can now be decoded (See
      [\#71](https://github.com/serratus/quaggaJS/issues/71))

Take a look at the release-notes (
    [0.11.0](https://github.com/serratus/quaggaJS/releases/tag/v0.11.0))

### 2016-04-19
- Improvements
  - Reducing false-positives for Code 128 barcodes (
      addresses [\#104](https://github.com/serratus/quaggaJS/issues/104))

### 2016-03-31
Take a look at the release-notes (
    [0.10.0](https://github.com/serratus/quaggaJS/releases/tag/v0.10.0))

### 2016-02-18

- Internal Changes
  - Restructuring into meaningful folders
  - Removing debug-code in production build


### 2016-02-15
Take a look at the release-notes (
    [0.9.0](https://github.com/serratus/quaggaJS/releases/tag/v0.9.0))

### 2015-11-22

- Fixes
  - Fixed inconsistencies for Code 128 decoding (See
      [\#76](https://github.com/serratus/quaggaJS/issues/76))

### 2015-11-15

- Fixes
  - Fixed inconsistency in Code 39 decoding
  - added inline-source-map to quagga.js file

### 2015-10-13
Take a look at the release-notes ([0.8.0]
(https://github.com/serratus/quaggaJS/releases/tag/v0.8.0))

- Improvements
  - Replaced RequireJS with webpack

### 2015-09-15
Take a look at the release-notes ([0.7.0]
(https://github.com/serratus/quaggaJS/releases/tag/v0.7.0))

- Features
  - Added basic support for running QuaggaJS inside __node__ (see [example]
  (#node-example))

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
[github_examples]: https://serratus.github.io/quaggaJS/examples
[i2of5_wiki]: https://en.wikipedia.org/wiki/Interleaved_2_of_5
[enumerateDevices]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices
