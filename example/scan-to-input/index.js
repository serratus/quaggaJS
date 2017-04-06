var Quagga = window.Quagga;
var App = {
    _scanner: null,
    init: function() {
        this.attachListeners();
        this._overlay = document.querySelector('.overlay');
    },
    activateScanner: function() {
        this.configureScanner('.overlay__content')
        .then(function(scanner) {
            this.showOverlay(scanner.stop.bind(scanner));
            return scanner.detect();
        }.bind(this))
        .then(function(result) {
            document.querySelector('input.isbn').value = result.codeResult.code;
        })
        .catch((e) => {
            console.log(e);
        })
        .then(function() {
            this.hideOverlay();
            this.attachListeners();
        }.bind(this));
    },
    attachListeners: function() {
        var self = this,
            button = document.querySelector('.input-field input + button.scan');

        button.addEventListener("click", function onClick(e) {
            e.preventDefault();
            button.removeEventListener("click", onClick);
            self.activateScanner();
        });
    },
    showOverlay: function(cancelCb) {
        var closeButton = document.querySelector('.overlay__close');
        closeButton.addEventListener('click', function closeClick() {
            closeButton.removeEventListener('click', closeClick);
            cancelCb();
        });
        this._overlay.style.display = "block";
    },
    hideOverlay: function() {
        if (this._overlay) {
            this._overlay.style.display = "none";
        }
    },
    configureScanner: function(selector) {
        if (this._scanner) {
            return Promise.resolve(this._scanner);
        }

        return Quagga.fromCamera({
            decoder: {readers: ['ean_reader']},
            target: selector,
        })
        .then((scanner) => {
            this._scanner = scanner;
            return scanner;
        });
    }
};
App.init();
