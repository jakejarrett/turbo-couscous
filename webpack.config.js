var Webpack = require("webpack");
var path = require("path");
var srcPath = path.resolve(__dirname, "src");
var nodeModulesPath = path.resolve(__dirname, "node_modules");
var buildPath = path.resolve(__dirname, "public", "build");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var DashboardPlugin = require("webpack-dashboard/plugin");
var autoprefixer = require("autoprefixer");
var precss = require("precss");

var config = {
    context: __dirname,
    devtool: "source-map",

    entry: [
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/dev-server",
        path.resolve(srcPath, "main.js")
    ],

    output: {
        path: buildPath,
        filename: "[name].js",
        publicPath: "/build/"
    },

    module: {
        preLoaders: [
            {
                test: /\.json$/,
                loader: "json"
            }
        ],
        loaders: [
            {
                /** Compiles ES6 to ES5 **/
                test: /\.js$/,
                loader: "babel",
                query: {
                    presets: ["es2015"]
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
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style?singleton",
                    loader: "!css-loader?locals&sourceMap!postcss!sass?sourceMap"
                })
            }
        ]
    },

    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin(),
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
