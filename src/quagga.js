import './common/typedefs';
import 'webrtc-adapter';
import createScanner from './scanner';
import ImageWrapper from './common/image_wrapper';
import ImageDebug from './common/image_debug';
import ResultCollector from './analytics/result_collector';
import Config from './config/config';
import {merge} from 'lodash';
import {createConfigFromSource} from './input/config_factory';

function fromConfig(config) {
    const scanner = createScanner();
    let pendingStart = null;
    let initialized = false;
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
            if (scanner.isRunning()) {
                return Promise.resolve(true);
            }
            if (pendingStart) {
                return pendingStart;
            }
            if (initialized) {
                scanner.start();
                return Promise.resolve(true);
            }
            pendingStart = new Promise((resolve, reject) => {
                scanner.init(config, (error) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    initialized = true;
                    scanner.start();
                    resolve();
                    pendingStart = null;
                });
            });
            return pendingStart;
        },
        stop() {
            scanner.stop();
            initialized = false;
            return this;
        },
        toPromise() {
            if (config.inputStream.type === 'LiveStream'
                    || config.inputStream.type === 'VideoStream') {
                let cancelRequested = false;
                return {
                    cancel() {
                        cancelRequested = true;
                    },
                    promise: new Promise((resolve, reject) => {
                        function onProcessed(result) {
                            if (result && result.codeResult && result.codeResult.code) {
                                scanner.stop();
                                scanner.unsubscribe("processed", onProcessed);
                                resolve(result);
                            }
                            if (cancelRequested) {
                                scanner.stop();
                                scanner.unsubscribe("processed", onProcessed);
                                reject("cancelled!");
                            }
                        }
                        scanner.subscribe("processed", onProcessed);
                        this.start();
                    })
                };
            } else {
                return new Promise((resolve, reject) => {
                    scanner.decodeSingle(config, (result) => {
                        if (result && result.codeResult && result.codeResult.code) {
                            return resolve(result);
                        }
                        return reject(result);
                    });
                });
            }
        },
        registerResultCollector(resultCollector) {
            scanner.registerResultCollector(resultCollector);
        },
        getCanvas() {
            return scanner.canvas.dom.image;
        },
    };
}

function fromSource(config, source, inputConfig = {}) {
    config = createConfigFromSource(config, inputConfig, source);
    return fromConfig(config);
}

function setConfig(configuration = {}, key, config = {}) {
    var mergedConfig = merge({}, configuration, {[key]: config});
    return createApi(mergedConfig);
}

function createApi(configuration = Config) {
    return {
        fromSource(src, inputConfig) {
            return fromSource(configuration, src, inputConfig);
        },
        fromConfig(conf) {
            return fromConfig(merge({}, configuration, conf));
        },
        decoder(conf) {
            return setConfig(configuration, "decoder", conf);
        },
        locator(conf) {
            return setConfig(configuration, "locator", conf);
        },
        throttle(timeInMs) {
            return setConfig(configuration, "frequency", 1000 / parseInt(timeInMs));
        },
        config(conf) {
            return createApi(merge({}, configuration, conf));
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
