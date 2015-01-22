$(function() {
    var App = {
        init: function() {
            App.attachListeners();
        },
        config: {
            reader: "code_128",
            length: 10
        },
        attachListeners: function() {
            $(".controls input[type=file]").on("change", function(e) {
                if (e.target.files && e.target.files.length) {
                    App.decode(URL.createObjectURL(e.target.files[0]));
                }
            });
            
            $(".controls .reader-group").on("change", "input", function(e) {
                e.preventDefault();
                App.detachListeners();
                App.config.reader = e.target.value;
                App.init();
            });
        },
        detachListeners: function() {
            $(".controls input[type=file]").off("change");
            $(".controls .reader-group").off("change", "input");
        },
        decode: function(src) {
            Quagga.decodeSingle({
                decoder: {
                    readers : [App.config.reader + '_reader']
                },
                locate : true,
                src : src
            }, function(result) {});
        }
    };
    
    App.init();

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
        var code = result.codeResult.code,
            $node,
            canvas = Quagga.canvas.dom.image;

        $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
        $node.find("img").attr("src", canvas.toDataURL());
        $node.find("h4.code").html(code);
        $("#result_strip ul.thumbnails").prepend($node);
    });
}); 