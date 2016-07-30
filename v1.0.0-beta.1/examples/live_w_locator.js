$(function() {
    var App = {
        init : function() {
            this.overlay = document.querySelector('#interactive canvas.drawing');

            this.scanner = Quagga
                .fromConfig(this.state);

            this.scanner
                .addEventListener("processed", drawResult.bind(this, this.scanner))
                .addEventListener("detected", addToResults.bind(this, this.scanner));

            this.scanner.start()
            .then(function (){
                console.log("started");
                this.attachListeners();
            }.bind(this))
            .catch(function(err) {
                console.log("Error: " + err);
            });
        },
        attachListeners: function() {
            var self = this;

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
                    o[key] = val;
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
            var self = this;

            if (typeof self._accessByPath(self.inputMapper, path) === "function") {
                value = self._accessByPath(self.inputMapper, path)(value);
            }

            self._accessByPath(self.state, path, value);

            console.log(JSON.stringify(self.state));
            this.detachListeners();
            this.scanner.stop();
            this.scanner.removeEventListener();
            this.init();
        },
        inputMapper: {
            inputStream: {
                constraints: function(value){
                    var values = value.split('x');
                    return {
                        width: parseInt(values[0]),
                        height: parseInt(values[1])
                    }
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
                    width: 640,
                    height: 480,
                    facingMode: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            frequency: 10,
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
