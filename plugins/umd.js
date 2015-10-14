var ConcatSource = require("webpack-core/lib/ConcatSource");
var OriginalSource = require("webpack-core/lib/OriginalSource");

function MyUmdPlugin(options) {
	this.name = options.library;
}
module.exports = MyUmdPlugin;
MyUmdPlugin.prototype.apply = function(compiler) {
    compiler.plugin("this-compilation", function(compilation) {
    	var mainTemplate = compilation.mainTemplate;
    	compilation.templatesPlugin("render-with-entry", function(source, chunk, hash) {

            var amdFactory = "factory";
    		return new ConcatSource(new OriginalSource(
    			"(function webpackUniversalModuleDefinition(root, factory) {\n" +
    			"	if(typeof exports === 'object' && typeof module === 'object')\n" +
    			"		module.exports = factory(factory.toString());\n" +
    			"	else if(typeof exports === 'object')\n" +
    			"		exports[\"" + this.name + "\"] = factory(factory.toString());\n" +
    			"	else\n" +
    			"		root[\"" + this.name + "\"] = factory(factory.toString());\n" +
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
