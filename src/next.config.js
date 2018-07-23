// next.config.js
const MergeFilesPlugin = require('merge-files-webpack-plugin');
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');

const baseConfig = {
    distDir: 'dist',
    webpack(config, options) {
        const { isServer, dev } = options;
        //ref: https://github.com/zeit/next-plugins/issues/21
        if (!isServer && !dev) {
            // Override next-css configuration
            options.extractCSSPlugin.filename = 'static/[name].css';
            // Merge all CSS in one file
            config.plugins.push(
                new MergeFilesPlugin({
                    filename: 'static/style.css',
                    test: /\.css/,
                    deleteSourceFiles: true
                })
            );
        }
        return config;
    }
};

module.exports = withCss(withLess(baseConfig));
