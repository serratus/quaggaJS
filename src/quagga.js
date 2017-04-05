import './common/typedefs';
import createScanner from './scanner';
import ImageWrapper from './common/image_wrapper';
import ImageDebug from './common/image_debug';
import ResultCollector from './analytics/result_collector';
import Config from './config/config';
import {merge, isEqual} from 'lodash';
import CameraAccess from './input/camera_access';
import * as PixelCapture from './input/PixelCapture';
import * as Source from './input/Source';
import {PORTRAIT, LANDSCAPE, SQUARE} from './common/device';

function hasConfigChanged(currentConfig, newConfig, prop) {
    if (!prop) {
        return !isEqual(currentConfig, newConfig);
    }
    return newConfig[prop] && !isEqual(currentConfig[prop], newConfig[prop]);
}

function fromConfig(pixelCapturer, config) {
    const scanner = createScanner(pixelCapturer);
    const source = pixelCapturer.getSource();
    let currentConfig = config;
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
                scanner.init(currentConfig, (error) => {
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
        detect() {
            if (source.type === 'CAMERA'
                    || source.type === 'VIDEO') {
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
                    scanner.decodeSingle(currentConfig, (result) => {
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
            return pixelCapturer.getCanvas();
        },
        applyConfig(newConfig) {
            const normalizedConfig = merge({}, Config, currentConfig, newConfig);
            let promise = Promise.resolve();
            if (hasConfigChanged(currentConfig, normalizedConfig, "constraints")) {
                console.log("constraints changed!", currentConfig.constraints, normalizedConfig.constraints);
                promise = promise.then(() => {
                    scanner.pause();
                    return source.applyConstraints(normalizedConfig.constraints);
                });
            }
            if (hasConfigChanged(currentConfig, normalizedConfig)) {
                console.log("config changed!");
                promise = promise.then(() => scanner.applyConfig(normalizedConfig));
            }
            currentConfig = normalizedConfig;
            return promise;
        },
        getSource() {
            return pixelCapturer.getSource();
        }
    };
}

function fromSource(config, source) {
    const pixelCapturer = PixelCapture.fromSource(source, {target: config.target});
    return fromConfig(pixelCapturer, config);
}

function createApi() {
    return {
        fromImage(image, options) {
            const config = merge({}, Config, options);
            return Source
                .fromImage(image, config.constraints)
                .then(fromSource.bind(null, config));
        },
        fromCamera(options) {
            const config = merge({}, Config, options);
            return Source
                .fromCamera(config.constraints, {
                    target: config.target,
                    scope: Source.Scope.INTERNAL,
                })
                .then(fromSource.bind(null, config));
        },
        fromSource(src, inputConfig) {
            return fromSource(configuration, src, inputConfig);
        },
        CameraAccess,
        ImageWrapper,
        ImageDebug,
        ResultCollector,
        _worker: {
            createScanner
        },
        Orientation: {
            PORTRAIT,
            LANDSCAPE,
            SQUARE,
        }
    };
}

export default createApi();
