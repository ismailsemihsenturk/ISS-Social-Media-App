const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        fs: require.resolve('fs-extra'),
        gracefulfs: require.resolve('graceful-fs'),
        util: require.resolve('util'),
        assert: require.resolve('assert'),
        stream: require.resolve('stream'),
        constants: require.resolve('constants'),
        path: require.resolve('path'),
        buffer: require.resolve('buffer'),
        // crypto: require.resolve('crypto-browserify'),
        // http: require.resolve('stream-http'),
        // https: require.resolve('https-browserify'),
        // os: require.resolve('os-browserify/browser'),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}