import TypeDefs from './common/typedefs'; // eslint-disable-line no-unused-vars
import WebrtcAdapter from 'webrtc-adapter'; // eslint-disable-line no-unused-vars
import createScanner from './scanner';
import ImageWrapper from './common/image_wrapper';
import ImageDebug from './common/image_debug';
import ResultCollector from './analytics/result_collector';
import Config from './config/config';
import {merge, pick, omitBy, isEmpty, omit} from 'lodash';


function fromImage(config, imageSrc, imageConfig) {
    config =
        merge({
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
        },
        omit(config, 'inputStream'),
        {inputStream: omitBy(pick(config.inputStream, ['size', 'src']), isEmpty)},
        {inputStream: imageConfig});

    console.log(config);
    const scanner = createScanner(config);
    return {
        addEventListener: (eventType, cb) => {
            scanner.decodeSingle(config, cb);
        },
        removeEventListener(cb) {
            console.log("Remove listener");
        },
        toPromise() {
            return new Promise((resolve, reject) => {
                scanner.decodeSingle(config, (result) => {
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

function setConfig(configuration = {}, key, config = {}) {
    var mergedConfig = merge({}, configuration, {[key]: config});
    return createApi(mergedConfig);
}

function createApi(configuration = Config) {
    return {
        fromImage(src, conf) {
            return fromImage(configuration, src, conf);
        },
        decoder(conf) {
            return setConfig(configuration, "decoder", conf);
        },
        locator(conf) {
            return setConfig(configuration, "locator", conf);
        },
        config(conf) {
            return createApi(merge({}, configuration, conf));
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
        registerResultCollector: function(resultCollector) {
            defaultScanner.registerResultCollector(resultCollector);
        },
        ImageWrapper: ImageWrapper,
        ImageDebug: ImageDebug,
        ResultCollector: ResultCollector,
        canvas: defaultScanner.canvas
    };
}
export default createApi();
