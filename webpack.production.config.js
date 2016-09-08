var Webpack = require("webpack");
var path = require("path");
var nodeModulesPath = path.resolve(__dirname, "node_modules");
var buildPath = path.resolve(__dirname, "public", "build");
var mainPath = path.resolve(__dirname, "src", "main.js");
var srcPath = path.resolve(__dirname, "src");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require("autoprefixer");
var precss = require("precss");

var config = {
    // We change to normal source mapping, if you need them
    devtool: "source-map",
    entry: mainPath,
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                /** Compiles ES6 to ES5 **/
                test: /\.js$/,
                loader: "babel",
                exclude: [nodeModulesPath]
            },
            {
                /** Support importing .html templates **/
                test: /\.html$/,
                loader: "html"
            },
            {
                /** Compiles SASS and then Import the Compiled CSS **/
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style?singleton", "!css-loader?locals&sourceMap!postcss!sass?sourceMap")

            }
        ]
    },
    plugins: [
        new Webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("app.min.css")
    ],

    postcss: function() {
        return [autoprefixer, precss];
    },

    resolve: {
        alias: {
            "marionette": "backbone.marionette",
            "underscore": "lodash",

            /**
             * Convenience
             */
            "app": path.resolve(srcPath, "app"),
            "modules": path.resolve(srcPath, "modules")
        }
    }
};

module.exports = config;
