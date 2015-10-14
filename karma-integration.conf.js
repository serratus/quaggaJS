var path = require('path');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
        files: [
            'test/test-main-integration.js',
            {pattern: 'test/integration/**/*.js', included: false},
            {pattern: 'test/fixtures/**/*.*', included: false}
        ],
        preprocessors: {
            'test/test-main-integration.js': ['webpack']
        },
        webpack: {
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        exclude: [
                            /node_modules/
                        ],
                        loader: 'babel'
                    }
                ]
            },
            resolve: {
              extensions: ['', '.js', '.jsx'],
              alias: {
                  'input_stream$': path.resolve(__dirname, 'src/input_stream'),
                  'frame_grabber$': path.resolve(__dirname, 'src/frame_grabber')
              }
            }
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-requirejs',
            'karma-chai',
            'karma-sinon',
            'karma-sinon-chai',
            require('karma-webpack')
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
