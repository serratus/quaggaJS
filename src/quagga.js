import TypeDefs from './common/typedefs'; // eslint-disable-line no-unused-vars
import WebrtcAdapter from 'webrtc-adapter'; // eslint-disable-line no-unused-vars
import createScanner from './scanner';
import ImageWrapper from './common/image_wrapper';
import Events from './common/events';
import ImageDebug from './common/image_debug';
import ResultCollector from './analytics/result_collector';
import Config from './config/config';
import {merge} from 'lodash';


function fromImage(config, imageSrc, imageConfig) {
    config = merge({
        inputStream: {
            type: "ImageStream",
            sequence: false,
            size: 800,
            src: imageSrc
        },
        numOfWorkers: (ENV.development && config.debug) ? 0 : 1,
        locator: {
            halfSample: false
        }
    }, config, {inputStream: imageConfig});
    const scanner = createScanner(config);
    return {
        addEventListener: (eventType, cb) => {
            scanner.init(config, () => {
                Events.once(eventType, (result) => {
                    scanner.stop();
                    cb(result);
                }, true);
                scanner.start();
            });
        },
        removeEventListener(cb) {
            console.log("Remove listener");
        },
        toPromise() {
            return new Promise((resolve, reject) => {
                scanner.addEventListener('processed', (result) => {
                    if (result.codeResult && result.codeResult.code) {
                        return resolve(result);
                    }
                    return reject(result);
                });
            });
        }
    };
}

/*function fromVideo(config, src) {
    // remember last instance
    // check if anything but the imagesrc has changed
    //
    let sourceConfig = {
        type : "LiveStream",
        constraints: {
            width: 640,
            height: 480,
            facingMode: "environment"
        }
    };
    if (source instanceof Stream) {
        // stream
    } else if (source instanceof Element) {
        // video element
    } else if (typeof source === 'string') {
        // video source
    } else if (typeof source === 'object') {
        // additional constraints
    } else if (!source) {
        // LiveStream
    }
    config = merge({inputStream: sourceConfig}, config);
    return {
        addEventListener: (eventType, cb) => {
            this.init(config, () => {
                start();
            });
            Events.subscribe(eventType, cb);
        },
        removeEventListener: (cb) => {
            Events.unsubscribe(eventType, cb);
        }
    }
} */

let defaultScanner = createScanner();
export default {
    withConfig: function(config) {
        return {
            fromImage: fromImage.bind(this, config)
            //fromVideo: fromVideo.bind(this, config)
        };
    },
    init: function(config, cb, imageWrapper) {
        defaultScanner.init(config, cb, imageWrapper);
    },
    start: function() {
        defaultScanner.start();
    },
    stop: function() {
        defaultScanner.stop();
    },
    pause: function() {
        defaultScanner.pause();
    },
    onDetected: function(callback) {
        defaultScanner.onDetected(callback);
    },
    offDetected: function(callback) {
        defaultScanner.offDetected(callback);
    },
    onProcessed: function(callback) {
        defaultScanner.onProcessed(callback);
    },
    offProcessed: function(callback) {
        defaultScanner.offProcessed(callback);
    },
    registerResultCollector: function(resultCollector) {
        defaultScanner.registerResultCollector(resultCollector);
    },
    decodeSingle: function(config, resultCallback) {
        defaultScanner.decodeSingle(config, resultCallback);
    },
    ImageWrapper: ImageWrapper,
    ImageDebug: ImageDebug,
    ResultCollector: ResultCollector,
    canvas: defaultScanner.canvas
};
