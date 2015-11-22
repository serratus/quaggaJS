module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            },
            integration: {
                configFile: 'karma-integration.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');

    grunt.loadTasks('tasks');

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('integrationtest', ['karma:integration']);
};
