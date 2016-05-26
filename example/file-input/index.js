var Quagga = window.Quagga;
var App = {
    _scanner: null,
    init: function() {
        this.attachListeners();
    },
    decode: function(src) {
        Quagga
            .decoder({readers: ['ean_reader']})
            .locator({patchSize: 'medium'})
            .fromImage(src, {size: 800})
            .toPromise()
            .then(function(result) {
                document.querySelector('input.isbn').value = result.codeResult.code;
            })
            .catch(function() {
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
                self.decode(URL.createObjectURL(e.target.files[0]));
            }
        });
    }
};
App.init();
