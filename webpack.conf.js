/** Core dependencies **/
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

/** Paths **/
const srcPath = path.resolve(__dirname, "src");
const nodeModulesPath = path.resolve(__dirname, "node_modules");
const buildPath = path.resolve(__dirname, "public", "assets/js");

/** Webpack plugins **/
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const precss = require("precss");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const opts = {

    context: __dirname,
    devtool: "source-map",

    entry: [
        "babel-polyfill",
        "webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr",
        path.resolve(srcPath, "main.js")
    ],

    output: {
        path: buildPath,
        filename: "[hash].js",
        publicPath: "/"
    },

    module: {
        rules: [

            {
                exclude: /(node_modules|bower_components)/,
                test: /\.js$/,
                loader: "babel-loader?babelrc=true"
            },

            {
                /** Support importing .html templates **/
                test: /\.html$/,
                loader: "html-loader"
            },

            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ["style-loader", "css-loader", "postcss-loader"]
            },

            {
                /** Compiles SASS, Runs PostCSS over the compiled SCSS and then Import the Compiled CSS **/
                test: /\.scss$/,
                include: [path.resolve(srcPath, "modules/components")],
                loader: [
                    "style-loader",
                    "css-loader?sourceMap=true&modules=true&importLoaders=1",
                    "postcss-loader?sourceMap=true",
                    "sass-loader?sourceMap=true"
                ]
            },

            {
                test: /\.scss$/,
                include: [path.resolve(srcPath, "modules/views")],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: `postcss-loader`,
                            options: {
                                plugins: () => {
                                    autoprefixer({ browsers: [ 'last 2 versions' ] });
                                    precss();
                                }
                            }
                        },
                        {
                            loader: `sass-loader`,
                            options: { sourcemap: true }
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        /** Anything that isn't a component **/
        new ExtractTextPlugin({
            filename: 'assets/css/[name].css'
        }),
        new webpack.ProvidePlugin({
            _: 'underscore',
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            tether: "tether",
            Tether: "tether",
            "window.Tether": "tether"
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            minify: {
                collapseWhitespace: true
            }
        })
    ],

    resolve: {
        extensions: [".js"],
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

if (process.env.NODE_ENV === "production") {
    const context = new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-au/);

    const uglify = new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },
        compress: {
            screw_ie8: true
        },
        comments: false
    });

    const optimizedCss = new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            autoprefixer: true,
            core: true,
            discardComments: {
                removeAll: true
            },
            discardDuplicates: true,
            discardEmpty: true,
            discardUnused: true,
            filterOptimiser: true,
            mergeRules: true,
            mergeLonghand: true,
            minifyGradients: true,
            minifyParams: true,
            svgo: true
        },
        canPrint: true
    });

    opts.plugins.push(context);
    opts.plugins.push(uglify);
    opts.plugins.push(optimizedCss)
} else {
    opts.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = opts;