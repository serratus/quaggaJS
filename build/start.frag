(function (root, factory) {
    var factorySource = factory.toString();

    if (typeof module !== 'undefined') {
        module.exports = factory(factorySource);
    } else {
        //Browser globals case. Just assign the
        //result to a property on the global.
        root.Quagga = factory(factorySource);
    }
}(this, function (__factorySource__) {