$(function() {
    var App = {
        init : function() {
            Quagga.init({
                inputStream : {
                    name : "Live",
                    type : "LiveStream"
                },
                decoder : {
                    readers : ["code_128_reader"]
                },
                readyFunc : function() {
                    App.attachListeners();
                    Quagga.start();
                }
            });
        },
        attachListeners : function() {
            $(".controls .reader-group").on("change", "input", function(e) {
                e.preventDefault();
                Quagga.setReaders([e.target.value + "_reader"]);
            });
        },
        detachListeners : function() {
            $(".controls .reader-group").off("change", "input");
        },
        lastResult : null
    };

    App.init();

    Quagga.onDetected(function(result) {
        if (App.lastResult !== result) {
            App.lastResult = result;
            var $node = null, canvas = Quagga.canvas.dom.image;

            $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
            $node.find("img").attr("src", canvas.toDataURL());
            $node.find("h4.code").html(result);
            $("#result_strip ul.thumbnails").prepend($node);
        }
    });

});
