const ConcatSource = require('webpack-sources').ConcatSource;
const OriginalSource = require('webpack-sources').OriginalSource;

class UmdPlugin {
    constructor() {
        this._pluginName = 'UmdPlugin';
    }

    apply(compiler) {
        const name = compiler.options.output.library;

        compiler.hooks.thisCompilation.tap(this._pluginName, compilation => {
            const mainTemplate = compilation.mainTemplate;

            mainTemplate.hooks.renderWithEntry.tap(this._pluginName, (source, _chunk, _hash) => {
                return new ConcatSource(new OriginalSource(`
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory(factory.toString()).default;
    } else if (typeof exports === 'object') {
        exports["${name}"] = factory(factory.toString()).default;
    } else {
        root["${name}"] = factory(factory.toString()).default;
    }
})(this, function(__factorySource__) {
    return `, 'webpack/myModuleDefinition'), source, `
});
`);
            });

            mainTemplate.hooks.globalHashPaths.tap(this._pluginName, paths => {
                if (name) {
                    paths = paths.concat(name);
                }
                return paths;
            });

            mainTemplate.hooks.hash.tap(this._pluginName, hash => {
                hash.update('umd');
                hash.update(name);
            });
        });
    }
}

module.exports = UmdPlugin;
