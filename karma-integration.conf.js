module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'requirejs', 'chai', 'sinon', 'sinon-chai'],
    files: [
      'test-main.js',
      'src/vendor/glMatrix.js',
      'src/typedefs.js',
      {pattern: 'node_modules/async/lib/async.js', included: false},
      {pattern: 'src/*.js', included: false},
      {pattern: 'spec/**/*integration.spec.js', included: false},
      {pattern: 'test/**/*.*', included: false}
    ],
    exclude: [
    ],
    plugins: [
        'karma-chrome-launcher',
        'karma-mocha',
        'karma-requirejs',
        'karma-chai',
        'karma-sinon',
        'karma-sinon-chai'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
