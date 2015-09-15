module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'requirejs', 'chai', 'sinon', 'sinon-chai'],
    files: [
      'test-main.js',
      'src/typedefs.js',
      {pattern: 'node_modules/async/lib/async.js', included: false},
      {pattern: 'node_modules/gl-matrix/dist/gl-matrix-min.js', included: false},
      {pattern: 'src/*.js', included: false},
      {pattern: 'spec/**/*.js', included: false},
      {pattern: 'test/**/*.*', included: false}
    ],
    exclude: [
        'spec/**/*integration.spec.js'
    ],
    preprocessors: {
        'src/*.js': ['coverage']
    },
    plugins: [
        'karma-chrome-launcher',
        'karma-coverage',
        'karma-mocha',
        'karma-requirejs',
        'karma-chai',
        'karma-sinon',
        'karma-sinon-chai',
        'karma-phantomjs-launcher'
    ],
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    coverageReporter: {
        type : 'html',
        dir : 'coverage/'
    }
  });
};
