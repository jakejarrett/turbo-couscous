"use strict";

/** Dependencies **/
const express = require("express");
const path = require("path");
const httpProxy = require("http-proxy");
const http = require("http");
const https = require('https');
const proxy = httpProxy.createProxyServer({ changeOrigin: true, ws: true });
const app = express();

/** Server side rendering **/
const fs = require("mz/fs");
const _ = require("underscore");
const crypto = require("crypto");

/** Helpers **/
const helpers = {
    /**
     * Returns true if the environment is set to production
     *
     * @returns {boolean}
     */
    isProduction () {
        return (process.env.NODE_ENV === "production")
    },

    /**
     * Returns the path we're serving files from
     *
     * @returns {String}
     */
    getPublicPath () {
        return path.resolve(__dirname, "public");
    },

    /**
     * Returns the folder you're serving your development files from (src)
     *
     * @returns {String}
     */
    getSourceFolder () {
        return path.resolve(__dirname, "src");
    }
};

/** Server side rendering helpers **/
const serverSideRendering = {

    /**
     * Matches paths like `/`, `/index.html`, `/about/` or `/about/index.html`.
     */
    toplevelSection: /([^/]*)(\/?|\/index.html)$/,

    /**
     * Regex to test if it contains /build/ inside of the url
     */
    isBuildSection: /(\/build)/,

    /**
     * Regex to test iof it contains /assets/ inside the url
     */
    isAssetsSection: /(\/assets)/
};

if(!helpers.isProduction()) {
    /** Pull in the bundle so we can import Webpack dev & webpack hmr **/
    var bundle = require("./server/bundle.js");

    /** Instantiate bundle and pass in a reference to app. **/
    bundle(app);

    /**
     * We're passing webpack dev commands to the server :)
     */
    app.all("/build/*", (req, res) => proxy.web(req, res, { target: "http://127.0.0.1:3001" }));
    app.all("/socket.io*", (req, res) => proxy.web(req, res, { target: "http://127.0.0.1:3001" }));
    proxy.on("error", (e) => console.log("Could not connect to proxy, please try again..."));
}

/** Provide static fallback **/
app.use(express.static(helpers.getPublicPath()));

/**
 * If it's a development environment, utilise the development helpers
 */
if (!helpers.isProduction()) {

    /**
     * We need to use basic HTTP service to proxy
     * websocket requests from webpack to express.
     */
    var server = http.createServer(app);
    server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));
    server.listen(3000, "0.0.0.0", 511, _ => console.log("Server running on port 3000"));

} else {

    /**
     * Bring your own key/cert, for development/testing use self signed certs & run chrome with
     * --ignore-certificate-errors flag.
     * (Don't leave this on, its a dangerous flag that probably shouldn't be enabled but is great for testing)
     */
    const privateKey = fs.readFileSync("./certificates/key.pem");
    const certificate = fs.readFileSync("./certificates/cert.pem");

    /**
     * Use HTTPS server.
     *
     * If you want a non-ssl server, you can just do do app.listen(port)
     */
    https.createServer({
        key: privateKey,
        cert: certificate
    }, app).listen(process.env.PORT, "0.0.0.0", 511, _ => {
        console.log(`Server running on port ${process.env.PORT}`)
    });

}
