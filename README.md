quaggaJS
========

QuaggaJS is a barcode-scanner entirely written in JavaScript supporting real-time localization and decoding of various types of barcodes such as EAN and CODE128. The library is also configured to use `getUserMedia` to get direct access to the user's camera stream. Even though the code contains some heavy image-processing parts, recent smartphones are capable of locating and decoding  barcodes in real-time.

![teaser][teaser_image]

## Requirements

In order to take full advantage of quaggaJS, the browser needs to support the `getUserMedia` API which is already implemented by the recent versions of Firefox, Chrome and Opera. The API is also available on their mobile counterparts installed on Android. Safari and IE do not allow the access to the camera yet, neither on desktop, nor on mobile. You can check [caniuse][caniuse_getusermedia] for updates.

In cases where real-time decoding is not needed, or the platform does not support `getUserMedia` QuaggaJS is also capable to decode image-files.



[teaser_image]: https://github.com/serratus/quaggaJS/blob/master/doc/img/quaggaJS-code128.png
[caniuse_getusermedia]: http://caniuse.com/#feat=stream
