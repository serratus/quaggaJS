/**
 * Idea taken from https://github.com/fpirsch/twin-bcrypt/blob/master/Gearfile.js
*/

'use strict';

var fs = require('fs');

module.exports = function(grunt) {
    grunt.registerTask('uglyasm', function() {
        var code = fs.readFileSync('dist/quagga.js', 'utf-8'),
            minifiedCode = fs.readFileSync('dist/quagga.min.js', 'utf-8'),
            commentEnd = '/* @preserve ASM END */',
            asmStartIdx = code.indexOf('/* @preserve ASM BEGIN */'),
            asmEndIdx = code.indexOf(commentEnd),
            asmCode = code.substring(asmStartIdx, asmEndIdx + commentEnd.length),
            asmFunctionRegex = /function (\w+)\(\w+,\s*\w+,\s*\w+\)\s*\{\s*"use asm";/,
            asmModule,
            asmModuleName,
            asmCodeMinified,
            asmMinifiedModuleName;

        asmCodeMinified = asmCode
            .replace(/\s*\/\/.*/g, '') // remove single-line comments
            .replace(/\s*\/\*[^]*?\*\//g, '') // remove multi-line comments
            .replace(/\n\s*/g, '') // remove indentation
            .replace(/ ([+=^|&]|>+|<+) /g, '$1') // remove spaces around operators
            .replace(/[\r\n/]/g, ''); // remove new lines

        grunt.log.debug(asmCodeMinified);

        asmModule = asmCode.match(asmFunctionRegex);
        if (!asmModule) {
            grunt.log.error("No ASM module found");
            return;
        }

        asmModuleName = asmModule[1];
        grunt.log.debug(asmModuleName);

        asmModule = minifiedCode.match(asmFunctionRegex);
        if (!asmModule) {
            grunt.log.error("No ASM module found in minified file");
            return;
        }

        asmMinifiedModuleName = asmModule[1];
        grunt.log.debug(asmMinifiedModuleName);

        asmCodeMinified = asmCodeMinified.replace(asmModuleName, asmMinifiedModuleName);

        minifiedCode = minifiedCode.replace(/\/\* @preserve ASM BEGIN \*\/[^]*?\/\* @preserve ASM END \*\//, asmCodeMinified);
        fs.writeFileSync('dist/quagga.min.js', minifiedCode);
        grunt.log.ok('dist/quagga.min.js written');
    });
};