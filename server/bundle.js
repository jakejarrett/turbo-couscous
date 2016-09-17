"use strict";

/**
 * Pull in all our dependencies
 */
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const DashboardPlugin = require('webpack-dashboard/plugin');
const compiler = webpack(webpackConfig);

/**
 * Export the middleware so we can clean up the server a bit.
 *
 * @param app {Object} The app inside of server.js (Express)
 */
module.exports = (app) => {
  compiler.apply(new DashboardPlugin());

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    inline: true,
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  }));

  app.use(webpackHotMiddleware(compiler));

};
