var Quagga = window.Quagga;
var App = {
    _lastResult: null,
    init: function() {
        this.attachListeners();
    },
    activateScanner: function() {
        var scanner = this.configureScanner('.overlay__content'),
            onDetected = function (result) {
                this.addToResults(result);
            }.bind(this),
            stop = function() {
                scanner.stop();  // should also clear all event-listeners?
                scanner.removeEventListener('detected', onDetected);
                this.hideOverlay();
                this.attachListeners();
            }.bind(this);

        this.showOverlay(stop);
        console.log("activateScanner");
        scanner.addEventListener('detected', onDetected).start();
    },
    addToResults: function(result) {
        if (this._lastResult === result.codeResult.code) {
            return;
        }
        this._lastResult = result.codeResult.code;
        var resultSets = document.querySelectorAll('ul.results');

        Array.prototype.slice.call(resultSets).forEach(function(resultSet) {
            var li = document.createElement('li'),
                format = document.createElement('span'),
                code = document.createElement('span');

            console.log(result);
            li.className = "result";
            format.className = "format";
            code.className = "code";

            li.appendChild(format);
            li.appendChild(code);

            format.appendChild(document.createTextNode(result.codeResult.format));
            code.appendChild(document.createTextNode(result.codeResult.code));

            resultSet.insertBefore(li, resultSet.firstChild);
        });
    },
    attachListeners: function() {
        var button = document.querySelector('button.scan'),
            self = this;

        button.addEventListener("click", function clickListener (e) {
            e.preventDefault();
            button.removeEventListener("click", clickListener);
            self.activateScanner();
        });
    },
    showOverlay: function(cancelCb) {
        document.querySelector('.container .controls')
            .classList.add('hide');
        document.querySelector('.overlay--inline')
            .classList.add('show');
        var closeButton = document.querySelector('.overlay__close');
        closeButton.addEventListener('click', function closeHandler() {
            closeButton.removeEventListener("click", closeHandler);
            cancelCb();
        });
    },
    hideOverlay: function() {
        document.querySelector('.container .controls')
            .classList.remove('hide');
        document.querySelector('.overlay--inline')
            .classList.remove('show');
    },
    querySelectedReaders: function() {
        return Array.prototype.slice.call(document.querySelectorAll('.readers input[type=checkbox]'))
            .filter(function(element) {
                return !!element.checked;
            })
            .map(function(element) {
                return element.getAttribute("name");
            });
    },
    configureScanner: function(selector) {
        var scanner = Quagga
            .decoder({readers: this.querySelectedReaders()})
            .locator({patchSize: 'medium'})
            .fromSource({
                target: selector,
                constraints: {
                    width: 600,
                    height: 600,
                    facingMode: "environment"
                }
            });
        return scanner;
    }
};
App.init();
