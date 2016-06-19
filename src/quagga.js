import './common/typedefs';
import 'webrtc-adapter';
import createScanner from './scanner';
import ImageWrapper from './common/image_wrapper';
import ImageDebug from './common/image_debug';
import ResultCollector from './analytics/result_collector';
import Config from './config/config';
import {merge} from 'lodash';
import {createConfigFromSource} from './input/config_factory';

function fromSource(config, source, inputConfig = {}) {
    config = createConfigFromSource(config, inputConfig, source);
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
        },
        toPromise() {
            // how to cancel?? timeout!
            return new Promise((resolve, reject) => {
                scanner.decodeSingle(config, (result) => {
                    if (result && result.codeResult && result.codeResult.code) {
                        return resolve(result);
                    }
                    return reject(result);
                });
            });
        }
    };
}

const defaultScanner = createScanner();

function setConfig(configuration = {}, key, config = {}) {
    var mergedConfig = merge({}, configuration, {[key]: config});
    return createApi(mergedConfig);
}

function createApi(configuration = Config) {
    return {
        fromSource(src, inputConfig) {
            return fromSource(configuration, src, inputConfig);
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
