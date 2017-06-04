$(function() {
    var resultCollector = Quagga.ResultCollector.create({
        capture: true,
        capacity: 20,
        blacklist: [{
            code: "WIWV8ETQZ1", format: "code_93"
        }, {
            code: "EH3C-%GU23RK3", format: "code_93"
        }, {
            code: "O308SIHQOXN5SA/PJ", format: "code_93"
        }, {
            code: "DG7Q$TV8JQ/EN", format: "code_93"
        }, {
            code: "VOFD1DB5A.1F6QU", format: "code_93"
        }, {
            code: "4SO64P4X8 U4YUU1T-", format: "code_93"
        }],
        filter: function(codeResult) {
            // only store results which match this constraint
            // e.g.: codeResult
            return true;
        }
    });
    var App = {
        init : function() {
            this.overlay = document.querySelector('#interactive canvas.drawing');

            Quagga.fromCamera({
                constraints: this.state.inputStream.constraints,
                locator: this.state.locator,
                decoder: this.state.decoder,
                numOfWorkers: this.state.numOfWorkers,
            }).then(function(scanner) {
                this.scanner = scanner;
                this.scanner
                    .addEventListener("processed", drawResult.bind(this, this.scanner))
                    .addEventListener("detected", addToResults.bind(this, this.scanner));

                this.scanner.start()
                .then(function (){
                    console.log("started");
                    this.attachListeners();
                }.bind(this))
                .catch(function(err) {
                    console.error(err);
                });
            }.bind(this));
        },
        initCameraSelection: function() {
            var streamLabel = this.scanner.getSource().getLabel();

            return Quagga.CameraAccess.enumerateVideoDevices()
            .then(function(devices) {
                function pruneText(text) {
                    return text.length > 30 ? text.substr(0, 30) : text;
                }
                var $deviceSelection = document.getElementById("deviceSelection");
                while ($deviceSelection.firstChild) {
                    $deviceSelection.removeChild($deviceSelection.firstChild);
                }
                devices.forEach(function(device) {
                    var $option = document.createElement("option");
                    $option.value = device.deviceId || device.id;
                    $option.appendChild(document.createTextNode(pruneText(device.label || device.deviceId || device.id)));
                    $option.selected = streamLabel === device.label;
                    $deviceSelection.appendChild($option);
                });
            });
        },
        attachListeners: function() {
            var self = this;

            self.initCameraSelection();
            $(".controls").on("click", "button.stop", function(e) {
                e.preventDefault();
                this.detachListeners();
                this.scanner.stop();
                this.scanner.removeEventListener();
            }.bind(this));

            $(".controls .reader-config-group").on("change", "input, select", function(e) {
                e.preventDefault();
                var $target = $(e.target),
                    value = $target.attr("type") === "checkbox" ? $target.prop("checked") : $target.val(),
                    name = $target.attr("name"),
                    state = self._convertNameToState(name);

                console.log("Value of "+ state + " changed to " + value);
                self.setState(state, value);
            });
        },
        _accessByPath: function(obj, path, val) {
            var parts = path.split('.'),
                depth = parts.length,
                setter = (typeof val !== "undefined") ? true : false;

            return parts.reduce(function(o, key, i) {
                if (setter && (i + 1) === depth) {
                    if (typeof o[key] === "object" && typeof val === "object") {
                        Object.assign(o[key], val);
                    } else {
                        o[key] = val;
                    }
                }
                return key in o ? o[key] : {};
            }, obj);
        },
        _convertNameToState: function(name) {
            return name.replace("_", ".").split("-").reduce(function(result, value) {
                return result + value.charAt(0).toUpperCase() + value.substring(1);
            });
        },
        detachListeners: function() {
            $(".controls").off("click", "button.stop");
            $(".controls .reader-config-group").off("change", "input, select");
        },
        setState: function(path, value) {
            if (typeof this._accessByPath(this.inputMapper, path) === "function") {
                value = this._accessByPath(this.inputMapper, path)(value, this.state);
            }

            this._accessByPath(this.state, path, value);

            console.log(JSON.stringify(this.state));

            this.scanner
            .applyConfig({
                constraints: this.state.inputStream.constraints,
                locator: this.state.locator,
                decoder: this.state.decoder,
                numOfWorkers: this.state.numOfWorkers,
            })
            .catch(e => console.error(e));
        },
        inputMapper: {
            inputStream: {
                constraints: function(value, state){
                    if (/^(\d+)x(\d+)$/.test(value)) {
                        var values = value.split('x');
                        return {
                            landscape: Object.assign({}, state.inputStream.constraints.landscape, {
                                width: {ideal: parseInt(values[0])},
                                height: {ideal: parseInt(values[1])},
                            }),
                            portrait: Object.assign({}, state.inputStream.constraints.portrait, {
                                width: {ideal: parseInt(values[0])},
                                height: {ideal: parseInt(values[0])},
                            }),
                            width: {ideal: parseInt(values[0])},
                            height: {ideal: parseInt(values[1])}
                        };
                    } else if (/^(\d+)\.?(\d+)?$/.test(value)) {
                        return Object.assign({}, state.inputStream.constraints, {
                            landscape: Object.assign({}, state.inputStream.constraints.landscape, {
                                zoom: {ideal: parseFloat(value)},
                            }),
                            portrait: Object.assign({}, state.inputStream.constraints.portrait, {
                                zoom: {ideal: parseFloat(value)},
                            }),
                        });
                    }
                    return {
                        deviceId: value
                    };
                }
            },
            numOfWorkers: function(value) {
                return parseInt(value);
            },
            decoder: {
                readers: function(value) {
                    if (value === 'ean_extended') {
                        return [{
                            format: "ean_reader",
                            config: {
                                supplements: [
                                    'ean_5_reader', 'ean_2_reader'
                                ]
                            }
                        }];
                    }
                    return [{
                        format: value + "_reader",
                        config: {}
                    }];
                }
            }
        },
        state: {
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: {ideal: 800},
                    height: {ideal: 800},
                    facingMode: "environment",
                    landscape: {
                        width: {ideal: 640},
                        height: {ideal: 480},
                    },
                    portrait: {
                        width: {ideal: 640},
                        height: {ideal: 640},
                        aspectRatio: 1,
                    }
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            frequency: 5,
            decoder: {
                readers : [{
                    format: "code_128_reader",
                    config: {}
                }]
            },
            locate: true
        },
        lastResult : null
    };

    App.init();

    function drawResult(scanner, result) {
        var processingCanvas = scanner.getCanvas(),
            canvas = App.overlay,
            ctx = canvas.getContext("2d");

        canvas.setAttribute('width', processingCanvas.getAttribute('width'));
        canvas.setAttribute('height', processingCanvas.getAttribute('height'));

        if (result) {
            if (result.boxes) {
                ctx.clearRect(0, 0, parseInt(canvas.getAttribute("width")), parseInt(canvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, ctx, {color: "green", lineWidth: 2});
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, ctx, {color: "#00F", lineWidth: 2});
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, ctx, {color: 'red', lineWidth: 3});
            }
        }
    };

    function addToResults(scanner, result) {
        var code = result.codeResult.code,
            $node,
            canvas = scanner.getCanvas();

        if (App.lastResult !== code) {
            App.lastResult = code;
            $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
            $node.find("img").attr("src", canvas.toDataURL());
            $node.find("h4.code").html(code);
            $("#result_strip ul.thumbnails").prepend($node);
        }
    };
});
