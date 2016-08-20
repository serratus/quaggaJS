$(function() {
    var App = {
        init: function() {
            this.overlay = document.querySelector('#interactive canvas.drawing');
            var config = this.config[this.state.decoder.readers[0].format] || this.config.default;
            config = $.extend(true, {}, config, this.state);

            this.scanner = Quagga
                .fromConfig(config);

            this.scanner
                .addEventListener("processed", drawResult.bind(this, this.scanner))
                .addEventListener("detected", addToResults.bind(this, this.scanner));

            this.scanner.start().then(function() {
                console.log("Started");
                this.attachListeners();
            }.bind(this));
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
                self.scanner.start();
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
            this.scanner.stop();
            this.scanner.removeEventListener();
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
            numOfWorkers: 1,
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

        $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
        $node.find("img").attr("src", canvas.toDataURL());
        $node.find("h4.code").html(code);
        $("#result_strip ul.thumbnails").prepend($node);
    }
});
