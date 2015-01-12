module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        uglify : {
            options : {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build : {
                src : 'dist/<%= pkg.name %>.js',
                dest : 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint : {
            all : ['Gruntfile.js', 'src/*.js']
        },
        requirejs : {
            quagga : {
                options : {
                    almond : true,
                    wrap : {
                        startFile : 'build/start.frag',
                        endFile : 'build/end.frag'
                    },
                    "baseUrl" : "src",
                    "name" : "quagga",
                    "out" : "dist/quagga.js",
                    "include" : ['quagga'],
                    "optimize" : "none",
                    "findNestedDependencies" : true,
                    "skipSemiColonInsertion" : true,

                    "shim" : {
                        "typedefs" : {
                            "deps" : [],
                            "exports" : "typedefs"
                        },
                        "glMatrix" : {
                            "deps" : ["typedefs"],
                            "exports" : "glMatrix"
                        },
                        "glMatrixAddon" : {
                            "deps" : ["glMatrix"],
                            "exports" : "glMatrixAddon"
                        }
                    },

                    "paths" : {
                        "typedefs" : "typedefs",
                        "glMatrix" : "vendor/glMatrix",
                        "glMatrixAddon" : "glMatrixAddon"
                    }
                }
            },
            locator : {
                options : {
                    almond : true,
                    wrap : {
                        startFile : 'build/locator_start.frag',
                        endFile : 'build/locator_end.frag'
                    },
                    "baseUrl" : "src",
                    "name" : "barcode_locator",
                    "out" : "dist/locator.js",
                    "include" : ['barcode_locator'],
                    "optimize" : "none",
                    "findNestedDependencies" : true,
                    "skipSemiColonInsertion" : true,
                    "shim" : {
                        "typedefs" : {
                            "deps" : [],
                            "exports" : "typedefs"
                        },
                        "glMatrix" : {
                            "deps" : ["typedefs"],
                            "exports" : "glMatrix"
                        },
                        "glMatrixAddon" : {
                            "deps" : ["glMatrix"],
                            "exports" : "glMatrixAddon"
                        }
                    },
                    "paths" : {
                        "typedefs" : "typedefs",
                        "glMatrix" : "vendor/glMatrix",
                        "glMatrixAddon" : "glMatrixAddon"
                    }
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-karma');
    // Default task(s).
    grunt.registerTask('default', ['jshint', 'requirejs']);
    grunt.registerTask('test', ['karma']);

}; 
