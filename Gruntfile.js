module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            },
            integration: {
                configFile: 'karma-integration.conf.js'
            }
        },
        jshint : {
            all : ['Gruntfile.js', 'src/*.js']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-karma');

    grunt.loadTasks('tasks');

    grunt.registerTask('build', ['check', 'requirejs']);
    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('dist', ['build', 'uglify', 'uglyasm']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('integrationtest', ['karma:integration']);

    grunt.registerTask('default', ['build']);
};
