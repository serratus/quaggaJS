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

    Quagga.onDetected(function(result) {
        var $node = null, canvas = Quagga.canvas.dom.image;

        $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
        $node.find("img").attr("src", canvas.toDataURL());
        $node.find("h4.code").html(result);
        $("#result_strip ul.thumbnails").prepend($node);
    });
}); 