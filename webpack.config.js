let path = require('path');
let webpack = require('webpack');
let pkg = require('./package.json');

module.exports = {
    entry: {
        contentScript: './src/contentScript.js',
        popup: './src/popup.js',
    },
    output: {
        path: path.join(__dirname, './crx'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-1'],
                    plugins: [
                        "add-module-exports"
                    ]
                }
            }
        }, {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }],
        }]
    },
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comparisons: false,
            output: {
                comments: false,
                ascii_only: true
            }
        })*/
    ]
};
