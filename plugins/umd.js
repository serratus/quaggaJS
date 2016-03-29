var ConcatSource = require("webpack-sources").ConcatSource;
var OriginalSource = require("webpack-sources").OriginalSource;

function MyUmdPlugin(options) {
	this.name = options.library;
}
module.exports = MyUmdPlugin;
MyUmdPlugin.prototype.apply = function(compiler) {
    compiler.plugin("this-compilation", function(compilation) {
    	var mainTemplate = compilation.mainTemplate;
    	compilation.templatesPlugin("render-with-entry", function(source, chunk, hash) {

    		return new ConcatSource(new OriginalSource(
    			"(function webpackUniversalModuleDefinition(root, factory) {\n" +
    			"	if(typeof exports === 'object' && typeof module === 'object')\n" +
    			"		module.exports = factory(factory.toString()).default;\n" +
    			"	else if(typeof exports === 'object')\n" +
    			"		exports[\"" + this.name + "\"] = factory(factory.toString()).default;\n" +
    			"	else\n" +
    			"		root[\"" + this.name + "\"] = factory(factory.toString()).default;\n" +
    			"})(this, function(__factorySource__) {\nreturn ", "webpack/myModuleDefinition"), source, "\n});\n");
    	}.bind(this));
    	mainTemplate.plugin("global-hash-paths", function(paths) {
    		if(this.name) paths = paths.concat(this.name);
    		return paths;
    	}.bind(this));
    	mainTemplate.plugin("hash", function(hash) {
    		hash.update("umd");
    		hash.update(this.name + "");
    	}.bind(this));
    }.bind(this));
};
