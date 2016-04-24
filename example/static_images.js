$(function() {
    var App = {
        init: function() {
            var config = this.config[this.state.decoder.readers[0].format] || this.config.default;
            config = $.extend(true, {}, config, this.state);
            Quagga.init(config, function() {
                App.attachListeners();
                Quagga.start();
            });
        },
        config: {
            "default": {
                inputStream: { name: "Test",
                    type: "ImageStream",
                    length: 10,
                    size: 800
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true
                }
            },
            "i2of5_reader": {
                inputStream: {
                    size: 800,
                    type: "ImageStream",
                    length: 5
                },
                locator: {
                    patchSize: "small",
                    halfSample: false
                }
            }
        },
        attachListeners: function() {
            var self = this;

            $(".controls").on("click", "button.next", function(e) {
                e.preventDefault();
                Quagga.start();
            });

            $(".controls .reader-config-group").on("change", "input, select", function(e) {
                e.preventDefault();
                var $target = $(e.target),
                    value = $target.attr("type") === "checkbox" ? $target.prop("checked") : $target.val(),
                    name = $target.attr("name"),
                    states = self._convertNameToStates(name);

                console.log("Value of "+ states + " changed to " + value);
                self.setState(states, value);
            });
        },
        detachListeners: function() {
            $(".controls").off("click", "button.next");
            $(".controls .reader-config-group").off("change", "input, select");
        },
        _accessByPath: function(obj, path, val) {
            var parts = path.split('.'),
                depth = parts.length,
                setter = (typeof val !== "undefined") ? true : false;

            return parts.reduce(function(o, key, i) {
                if (setter && (i + 1) === depth) {
                    o[key] = val;
                }
                return key in o ? o[key] : {};
            }, obj);
        },
        _convertNameToStates: function(names) {
            return names.split(";").map(this._convertNameToState.bind(this));
        },
        _convertNameToState: function(name) {
            return name.replace("_", ".").split("-").reduce(function(result, value) {
                return result + value.charAt(0).toUpperCase() + value.substring(1);
            });
        },
        setState: function(paths, value) {
            var self = this;

            paths.forEach(function(path) {
                var mappedValue;

                if (typeof self._accessByPath(self.inputMapper, path) === "function") {
                    mappedValue = self._accessByPath(self.inputMapper, path)(value);
                }
                self._accessByPath(self.state, path, mappedValue);
            });

            console.log(JSON.stringify(self.state));
            App.detachListeners();
            Quagga.stop();
            App.init();
        },
        inputMapper: {
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
            },
            inputStream: {
                src: function(value) {
                    return "../test/fixtures/" + value + "/"
                }
            }
        },
        state: {
            inputStream: {
                src: "../test/fixtures/code_128/"
            },
            decoder : {
                readers : [{
                    format: "code_128_reader",
                    config: {}
                }]
            }
        }
    };

    App.init();
    window.App = App;

    Quagga.onProcessed(function(result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
            }
        }
    });

    Quagga.onDetected(function(result) {
        var $node,
            canvas = Quagga.canvas.dom.image,
            detectedCode = result.codeResult.code;

        $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
        $node.find("img").attr("src", canvas.toDataURL());
        $node.find("h4.code").html(detectedCode);
        $("#result_strip ul.thumbnails").prepend($node);
    });
});
