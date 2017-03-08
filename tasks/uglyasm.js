/**
 * Idea taken from https://github.com/fpirsch/twin-bcrypt/blob/master/Gearfile.js
*/

'use strict';

var fs = require('fs');

module.exports = function(grunt) {
    grunt.registerTask('uglyasm', function() {
        var code = fs.readFileSync('dist/quagga.js', 'utf-8'),
            minifiedCode = fs.readFileSync('dist/quagga.min.js', 'utf-8'),
            commentEnd = '@preserve ASM END',
            moduleFunctionRegex = /function\s*\((\w+,\s*\w+,\s*\w+)\)\s*\{(\n?\s*\"use strict\";?)*\n?\/\*\s*\@preserve ASM BEGIN/,
            commentStartIdx = code.indexOf("@preserve ASM BEGIN"),
            asmEndIdxTmp = code.indexOf(commentEnd),
            asmEndIdx = code.indexOf("}", asmEndIdxTmp),
            asmCodeTmp = code.substring(commentStartIdx - Math.min(500, commentStartIdx),
                asmEndIdx + 1),
            asmStartIdx = asmCodeTmp.search(moduleFunctionRegex),
            asmCode = asmCodeTmp.substring(asmStartIdx),
            asmModule,
            moduleArg1,
            asmCodeMinified;

        asmCodeMinified = asmCode
            .replace(/\s*\/\/.*/g, '') // remove single-line comments
            .replace(/\s*\/\*[^]*?\*\//g, '') // remove multi-line comments
            .replace(/\n\s*/g, '') // remove indentation
            .replace(/ ([+=^|&]|>+|<+) /g, '$1') // remove spaces around operators
            .replace(/[\r\n/]/g, ''); // remove new lines

        asmModule = moduleFunctionRegex.exec(asmCode);
        if (!asmModule) {
            grunt.log.error("No ASM module found");
            return;
        }

        moduleArg1 = asmModule[1];
        grunt.log.debug(moduleArg1);

        var insertionPoint = minifiedCode.search(moduleFunctionRegex);
        if (insertionPoint === -1) {
            grunt.log.error("No ASM module found in minified file");
            return;
        }
        grunt.log.debug(insertionPoint);

        var insertionPointEnd = minifiedCode.indexOf(commentEnd, insertionPoint);
        insertionPointEnd = minifiedCode.indexOf("}", insertionPointEnd) + 1;

        grunt.log.debug(insertionPointEnd);

        minifiedCode = minifiedCode.substring(0, insertionPoint)
            + asmCodeMinified
            + minifiedCode.substring(insertionPointEnd);

        fs.writeFileSync('dist/quagga.min.js', minifiedCode);
        grunt.log.ok('dist/quagga.min.js written');
    });
};
