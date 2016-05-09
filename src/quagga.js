import TypeDefs from './common/typedefs'; // eslint-disable-line no-unused-vars
import WebrtcAdapter from 'webrtc-adapter'; // eslint-disable-line no-unused-vars
import createScanner from './scanner';
import ImageWrapper from './common/image_wrapper';
import ImageDebug from './common/image_debug';
import ResultCollector from './analytics/result_collector';
import Config from './config/config';
import {merge, pick, omitBy, isEmpty, omit} from 'lodash';


// TODO: Keep record of already created scanners for reuse?!

function fromImage(config, imageSrc, inputConfig={}) {
    const staticImageConfig = {
        inputStream: {
            type: "ImageStream",
            sequence: false,
            size: 800,
            src: imageSrc
        },
        numOfWorkers: (ENV.development && config.debug) ? 0 : 1
    };
    config = merge(
        config,
        staticImageConfig,
        {numOfWorkers: typeof config.numOfWorkers === 'number' && config.numOfWorkers > 0 ? 1 : 0},
        {inputStream: omitBy(pick(config.inputStream, ['size', 'src']), isEmpty)},
        {inputStream: inputConfig});

    const scanner = createScanner();
    return {
        addEventListener(eventType, cb) {
            scanner.subscribe(eventType, cb);
            return this;
        },
        removeEventListener(eventType, cb) {
            scanner.unsubscribe(eventType, cb);
            return this;
        },
        start() {
            scanner.init(config, () => {
                scanner.start();
            });
            return this;
        },
        stop() {
            scanner.stop();
            return this;
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

function fromVideo(config, source, inputConfig = {}) {
    // remember last instance
    // check if anything but the imagesrc has changed
    //
    let sourceConfig = {
        type: "LiveStream",
        constraints: {
            width: 640,
            height: 480,
            facingMode: "environment"
        }
    };

    /*if (source instanceof MediaStream) {
        // stream
    } else*/ if (source instanceof Element) {
        // video element
    } else if (typeof source === 'string') {
        // video source
    } else if (typeof source === 'object'
            && (typeof source.constraints !== 'undefined'
            || typeof source.area !== 'undefined')) {
        console.log("inputConfig");
        inputConfig = source;
    } else if (!source) {
        // LiveStream
    }
    config = merge({}, config, {inputStream: sourceConfig}, {inputStream: inputConfig});
    console.log(config);
    const scanner = createScanner();
    return {
        addEventListener(eventType, cb) {
            scanner.subscribe(eventType, cb);
            return this;
        },
        removeEventListener(eventType, cb) {
            scanner.unsubscribe(eventType, cb);
            return this;
        },
        start() {
            scanner.init(config, (error) => {
                if (error) {
                    console.log(error);
                    throw error;
                }
                scanner.start();
            });
            return this;
        },
        stop() {
            scanner.stop();
            return this;
        }
    };
}

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
        fromVideo(src, inputConfig) {
            return fromVideo(configuration, src, inputConfig);
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
        registerResultCollector(resultCollector) {
            defaultScanner.registerResultCollector(resultCollector);
        },
        getCanvas() {
            return defaultScanner.canvas;
        },
        ImageWrapper,
        ImageDebug,
        ResultCollector,
        _worker: {
            createScanner
        }
    };
}
export default createApi();
