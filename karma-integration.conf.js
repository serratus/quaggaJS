var path = require('path');
var webpack = require('webpack');

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
            entry: [
                './src/quagga.js'
            ],
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }]
            },
            resolve: {
                modules: [
                    path.resolve('./src/input/'),
                    path.resolve('./src/common/'),
                    'node_modules'
                ]
            },
            plugins: [
                new webpack.DefinePlugin({
                    ENV: require(path.join(__dirname, './env/production'))
                })
            ]
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-sinon-chai',
            require('karma-webpack')
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO, // LOG_DEBUG
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
