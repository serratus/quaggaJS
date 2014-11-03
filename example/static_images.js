$(function() {
    Quagga.init({
        inputStream: { name: "Test",
           type: "ImageStream",
           src: "/test/fixtures/code_128/",
           length: 10
        },
        decoder : {
            readers : ['code_128_reader']
        },
        readyFunc : function() {
            Quagga.start();
        }
    });

    Quagga.onDetected(function(result) {
        var $node = null, canvas = Quagga.canvas.dom.image;

        $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
        $node.find("img").attr("src", canvas.toDataURL());
        $node.find("h4.code").html(result);
        $("#result_strip ul.thumbnails").prepend($node);
    });
    
    $(".controls").on("click", "button.next", function(e) {
        Quagga.start();
    });
}); 