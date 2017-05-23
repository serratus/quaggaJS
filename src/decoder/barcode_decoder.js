import Bresenham from './bresenham';
import ImageDebug from '../common/image_debug';
import Code128Reader from '../reader/code_128_reader';
import EANReader from '../reader/ean_reader';
import Code39Reader from '../reader/code_39_reader';
import Code39VINReader from '../reader/code_39_vin_reader';
import CodabarReader from '../reader/codabar_reader';
import UPCReader from '../reader/upc_reader';
import EAN8Reader from '../reader/ean_8_reader';
import EAN2Reader from '../reader/ean_2_reader';
import EAN5Reader from '../reader/ean_5_reader';
import UPCEReader from '../reader/upc_e_reader';
import I2of5Reader from '../reader/i2of5_reader';
import TwoOfFiveReader from '../reader/2of5_reader';
import Code93Reader from '../reader/code_93_reader';

const READERS = {
    code_128_reader: Code128Reader,
    ean_reader: EANReader,
    ean_5_reader: EAN5Reader,
    ean_2_reader: EAN2Reader,
    ean_8_reader: EAN8Reader,
    code_39_reader: Code39Reader,
    code_39_vin_reader: Code39VINReader,
    codabar_reader: CodabarReader,
    upc_reader: UPCReader,
    upc_e_reader: UPCEReader,
    i2of5_reader: I2of5Reader,
    '2of5_reader': TwoOfFiveReader,
    code_93_reader: Code93Reader
};
export default {
    create: function(config, inputImageWrapper) {
        var _canvas = {
                ctx: {
                    frequency: null,
                    pattern: null,
                    overlay: null
                },
                dom: {
                    frequency: null,
                    pattern: null,
                    overlay: null
                }
            },
            _barcodeReaders = [];

        initCanvas();
        initReaders();
        initConfig();

        function initCanvas() {
            if (ENV.development && typeof document !== 'undefined') {
                var $debug = document.querySelector("#debug.detection");
                _canvas.dom.frequency = document.querySelector("canvas.frequency");
                if (!_canvas.dom.frequency) {
                    _canvas.dom.frequency = document.createElement("canvas");
                    _canvas.dom.frequency.className = "frequency";
                    if ($debug) {
                        $debug.appendChild(_canvas.dom.frequency);
                    }
                }
                _canvas.ctx.frequency = _canvas.dom.frequency.getContext("2d");

                _canvas.dom.pattern = document.querySelector("canvas.patternBuffer");
                if (!_canvas.dom.pattern) {
                    _canvas.dom.pattern = document.createElement("canvas");
                    _canvas.dom.pattern.className = "patternBuffer";
                    if ($debug) {
                        $debug.appendChild(_canvas.dom.pattern);
                    }
                }
                _canvas.ctx.pattern = _canvas.dom.pattern.getContext("2d");

                _canvas.dom.overlay = document.querySelector("canvas.drawingBuffer");
                if (_canvas.dom.overlay) {
                    _canvas.ctx.overlay = _canvas.dom.overlay.getContext("2d");
                }
            }
        }

        function initReaders() {
            config.readers.forEach(function(readerConfig) {
                var reader,
                    configuration = {},
                    supplements = [];

                if (typeof readerConfig === 'object') {
                    reader = readerConfig.format;
                    configuration = readerConfig.config;
                } else if (typeof readerConfig === 'string') {
                    reader = readerConfig;
                }
                if (ENV.development) {
                    console.log("Before registering reader: ", reader);
                }
                if (configuration.supplements) {
                    supplements = configuration
                        .supplements.map((supplement) => {
                            return new READERS[supplement]();
                        });
                }
                _barcodeReaders.push(new READERS[reader](configuration, supplements));
            });
            if (ENV.development) {
                console.log("Registered Readers: " + _barcodeReaders
                    .map((reader) => JSON.stringify({format: reader.FORMAT, config: reader.config}))
                    .join(', '));
            }
        }

        function initConfig() {
            if (ENV.development && typeof document !== 'undefined') {
                var i,
                    vis = [{
                        node: _canvas.dom.frequency,
                        prop: config.debug.showFrequency
                    }, {
                        node: _canvas.dom.pattern,
                        prop: config.debug.showPattern
                    }];

                for (i = 0; i < vis.length; i++) {
                    if (vis[i].prop === true) {
                        vis[i].node.style.display = "block";
                    } else {
                        vis[i].node.style.display = "none";
                    }
                }
            }
        }

        /**
         * extend the line on both ends
         * @param {Array} line
         * @param {Number} angle
         */
        function getExtendedLine(line, angle, ext) {
            function extendLine(amount) {
                var extension = {
                    y: amount * Math.sin(angle),
                    x: amount * Math.cos(angle)
                };

                line[0].y -= extension.y;
                line[0].x -= extension.x;
                line[1].y += extension.y;
                line[1].x += extension.x;
            }

            // check if inside image
            extendLine(ext);
            while (ext > 1 && (!inputImageWrapper.inImageWithBorder(line[0], 0)
                    || !inputImageWrapper.inImageWithBorder(line[1], 0))) {
                ext -= Math.ceil(ext / 2);
                extendLine(-ext);
            }
            return line;
        }

        function getLine(box) {
            return [{
                x: (box[1][0] - box[0][0]) / 2 + box[0][0],
                y: (box[1][1] - box[0][1]) / 2 + box[0][1]
            }, {
                x: (box[3][0] - box[2][0]) / 2 + box[2][0],
                y: (box[3][1] - box[2][1]) / 2 + box[2][1]
            }];
        }

        function tryDecode(line) {
            var result = null,
                i,
                barcodeLine = Bresenham.getBarcodeLine(inputImageWrapper, line[0], line[1]);

            if (ENV.development && config.debug.showFrequency) {
                ImageDebug.drawPath(line, {x: 'x', y: 'y'}, _canvas.ctx.overlay, {color: 'red', lineWidth: 3});
                Bresenham.debug.printFrequency(barcodeLine.line, _canvas.dom.frequency);
            }

            Bresenham.toBinaryLine(barcodeLine);

            if (ENV.development && config.debug.showPattern) {
                Bresenham.debug.printPattern(barcodeLine.line, _canvas.dom.pattern);
            }

            for ( i = 0; i < _barcodeReaders.length && result === null; i++) {
                result = _barcodeReaders[i].decodePattern(barcodeLine.line);
            }
            if (result === null){
                return null;
            }
            return {
                codeResult: result,
                barcodeLine: barcodeLine
            };
        }

        /**
         * This method slices the given area apart and tries to detect a barcode-pattern
         * for each slice. It returns the decoded barcode, or null if nothing was found
         * @param {Array} box
         * @param {Array} line
         * @param {Number} lineAngle
         */
        function tryDecodeBruteForce(box, line, lineAngle) {
            var sideLength = Math.sqrt(Math.pow(box[1][0] - box[0][0], 2) + Math.pow((box[1][1] - box[0][1]), 2)),
                i,
                slices = 16,
                result = null,
                dir,
                extension,
                xdir = Math.sin(lineAngle),
                ydir = Math.cos(lineAngle);

            for ( i = 1; i < slices && result === null; i++) {
                // move line perpendicular to angle
                dir = sideLength / slices * i * (i % 2 === 0 ? -1 : 1);
                extension = {
                    y: dir * xdir,
                    x: dir * ydir
                };
                line[0].y += extension.x;
                line[0].x -= extension.y;
                line[1].y += extension.x;
                line[1].x -= extension.y;

                result = tryDecode(line);
            }
            return result;
        }

        function getLineLength(line) {
            return Math.sqrt(
                Math.pow(Math.abs(line[1].y - line[0].y), 2) +
                Math.pow(Math.abs(line[1].x - line[0].x), 2));
        }

        /**
         * With the help of the configured readers (Code128 or EAN) this function tries to detect a
         * valid barcode pattern within the given area.
         * @param {Object} box The area to search in
         * @returns {Object} the result {codeResult, line, angle, pattern, threshold}
         */
        function decodeFromBoundingBox(box) {
            var line,
                lineAngle,
                ctx = _canvas.ctx.overlay,
                result,
                lineLength;

            if (ENV.development) {
                if (config.debug.drawBoundingBox && ctx) {
                    ImageDebug.drawPath(box, {x: 0, y: 1}, ctx, {color: "blue", lineWidth: 2});
                }
            }

            line = getLine(box);
            lineLength = getLineLength(line);
            lineAngle = Math.atan2(line[1].y - line[0].y, line[1].x - line[0].x);
            line = getExtendedLine(line, lineAngle, Math.floor(lineLength * 0.1));
            if (line === null){
                return null;
            }

            result = tryDecode(line);
            if (result === null) {
                result = tryDecodeBruteForce(box, line, lineAngle);
            }

            if (result === null) {
                return null;
            }

            if (ENV.development && result && config.debug.drawScanline && ctx) {
                ImageDebug.drawPath(line, {x: 'x', y: 'y'}, ctx, {color: 'red', lineWidth: 3});
            }

            return {
                codeResult: result.codeResult,
                line: line,
                angle: lineAngle,
                pattern: result.barcodeLine.line,
                threshold: result.barcodeLine.threshold
            };
        }

        return {
            decodeFromBoundingBox: function(box) {
                return decodeFromBoundingBox(box);
            },
            decodeFromBoundingBoxes: function(boxes) {
                var i, result,
                    barcodes = [],
                    multiple = config.multiple;

                for ( i = 0; i < boxes.length; i++) {
                    const box = boxes[i];
                    result = decodeFromBoundingBox(box) || {};
                    result.box = box;

                    if (multiple) {
                        barcodes.push(result);
                    } else if (result.codeResult) {
                        return result;
                    }
                }

                if (multiple) {
                    return {
                        barcodes
                    };
                }
            },
            setReaders: function(readers) {
                config.readers = readers;
                _barcodeReaders.length = 0;
                initReaders();
            }
        };
    }
};
