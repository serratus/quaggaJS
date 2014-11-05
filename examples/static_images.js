$(function() {
    var App = {
        init: function() {
            Quagga.init({
                inputStream: { name: "Test",
                   type: "ImageStream",
                   src: "/test/fixtures/" + App.config.reader + "/",
                   length: App.config.length
                },
                decoder : {
                    readers : [App.config.reader + "_reader"]
                },
                readyFunc : function() {
                    App.attachListeners();
                    Quagga.start();
                }
            });
        },
        config: {
            reader: "code_128",
            length: 10
        },
        attachListeners: function() {
            $(".controls").on("click", "button.next", function(e) {
                e.preventDefault();
                Quagga.start();
            });
            
            $(".controls .reader-group").on("change", "input", function(e) {
                e.preventDefault();
                App.detachListeners();
                Quagga.stop();
                App.config.reader = e.target.value;
                App.init();
            });
        },
        detachListeners: function() {
            $(".controls").off("click", "button.next");
            $(".controls .reader-group").off("change", "input");
        }
    };
    
    App.init();

    Quagga.onDetected(function(result) {
        var $node = null, canvas = Quagga.canvas.dom.image;

        $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
        $node.find("img").attr("src", canvas.toDataURL());
        $node.find("h4.code").html(result);
        $("#result_strip ul.thumbnails").prepend($node);
    });
}); 