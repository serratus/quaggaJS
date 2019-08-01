const webpackConfig = {
    mode: 'production',
    module: {
        rules: [{
            test: /\.(js|ts)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.ts']
    }
};

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            { pattern: 'test/integration/**/*.ts' },
            { pattern: 'test/fixtures/**/*.*', included: false }
        ],
        preprocessors: {
            '**/*.ts': ['webpack']
        },
        webpack: webpackConfig,
        plugins: [
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-webpack'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO, // LOG_DEBUG
        autoWatch: true,
        customLaunchers: {
            ChromeDebugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9333'],
                debug: true
            }
        },
        browsers: ['ChromeDebugging'],
        singleRun: false
    });
};
