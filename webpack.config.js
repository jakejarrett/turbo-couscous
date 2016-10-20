var Webpack = require("webpack");
var path = require("path");
var srcPath = path.resolve(__dirname, "src");
var nodeModulesPath = path.resolve(__dirname, "node_modules");
var buildPath = path.resolve(__dirname, "public", "build");

var autoprefixer = require("autoprefixer");
var precss = require("precss");

var config = {
    context: __dirname,
    devtool: "source-map",

    entry: [
        "webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr",
        path.resolve(srcPath, "main.js")
    ],

    output: {
        path: buildPath,
        filename: "[name].js",
        publicPath: "/build/"
    },

    module: {

        rules: [
            {
                enforce: "pre",
                test: /\.json$/,
                loader: "json"
            },

            {
                /** Compiles ES6 to ES5 **/
                test: /\.js$/,
                loader: "babel",
                query: {
                    plugins: [
                        "transform-decorators-legacy",
                        "syntax-decorators",
                        "transform-decorators",
                        "transform-function-bind"
                    ],
                    presets: ["es2016"]
                },
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
                loader: ["style", "css?modules&importLoaders=1&localIdentName", "postcss", "sass?sourceMap"]
            }
        ]
    },

    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.LoaderOptionsPlugin({
            postcss: function() {
                return [autoprefixer, precss];
            }
        })
    ],

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
