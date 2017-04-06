var Quagga = window.Quagga;
var App = {
    _scanner: null,
    init: function() {
        this.attachListeners();
    },
    decode: function(file) {
        Quagga.fromImage({
            constraints: {src: file, width: 800, height: 800},
            decoder: {readers: ['ean_reader']},
        })
        .then(function(scanner) {
            return scanner.detect();
        })
        .then(function(result) {
            document.querySelector('input.isbn').value = result.codeResult.code;
        })
        .catch(function(e) {
            console.error(e);
            document.querySelector('input.isbn').value = "Not Found";
        })
        .then(function() {
            this.attachListeners();
        }.bind(this));
    },
    attachListeners: function() {
        var self = this,
            button = document.querySelector('.input-field input + .button.scan'),
            fileInput = document.querySelector('.input-field input[type=file]');

        button.addEventListener("click", function onClick(e) {
            e.preventDefault();
            button.removeEventListener("click", onClick);
            document.querySelector('.input-field input[type=file]').click();
        });

        fileInput.addEventListener("change", function onChange(e) {
            e.preventDefault();
            fileInput.removeEventListener("change", onChange);
            if (e.target.files && e.target.files.length) {
                self.decode(e.target.files[0]);
            }
        });
    }
};
App.init();
