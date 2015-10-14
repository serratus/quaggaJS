var path = require('path');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['source-map-support', 'mocha', 'chai', 'sinon', 'sinon-chai'],
        files: [
            'test/test-main.js',
            {pattern: 'test/spec/**/*.js', included: false}
        ],
        preprocessors: {
            'test/test-main.js': ['webpack']
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
                    },
                    {
                        test: /\.js$/,
                        include: [
                            path.resolve('src')
                        ],
                        exclude: /node_modules/,
                        loader: 'isparta'
                    }
                ]
            },
            resolve: {
                extensions: ['', '.js', '.jsx'],
                alias: {
                    'input_stream$': path.resolve(__dirname, 'src/input_stream'),
                    'frame_grabber$': path.resolve(__dirname, 'src/frame_grabber')
                }
            },
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-sinon-chai',
            'karma-source-map-support',
            require('karma-webpack')
        ],
        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }
    });
};
