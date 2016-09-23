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

/**
 * Based on the code from the Google chrome live stream for Server side rendering
 *
 * @see https://github.com/GoogleChrome/ui-element-samples/blob/gh-pages/server-side-rendering/index.js
 */
app.get(serverSideRendering.toplevelSection, (req, res) => {

    /**
     * Conditions to determine if we should send JS or HTML files.
     *
     * @type {boolean}
     */
    const isBuild = serverSideRendering.isBuildSection.test(req.originalUrl);
    const isServiceWorker = req.params[0] === "sw.js";
    const isAssetsFolder = serverSideRendering.isAssetsSection.test(req.originalUrl);
    const isManifestFile = req.params[0] === "manifest.json";
    const shouldBuildFile = (!isBuild && !isServiceWorker && !isAssetsFolder && !isManifestFile);

    /**
     * If its the build folder, return the requested file :)
     */
    if(isBuild && helpers.isProduction()) {
        res.sendFile(`${helpers.getPublicPath()}/build/${req.params[0]}`)
    }

    /**
     * If its the assets folder, return the requested file :)
     */
    if(isAssetsFolder) {
        res.sendFile(`${helpers.getPublicPath()}${req.originalUrl}`);
    }

    /**
     * If its a service worker or manifest file, just send the files :)
     */
    if(isServiceWorker || isManifestFile) {
        res.setHeader('content-type', 'application/javascript');
        res.sendFile(`${helpers.getPublicPath()}/${req.params[0]}`)
    }

    /**
     * Extract the menu item name from the path and attach it to
     * the request to have it available for template rendering.
     */
    req.item = req.params[0] || "home";

    /**
     * To prevent issues, we'll only send the partials if its not the /build/ files & service workers.
     */
    if(shouldBuildFile) {

        /**
         * Files to send.
         *
         * @type {Array} Array of the files (each file will be the string representation of the file)
         */
        let files = [
            fs.readFile(`${helpers.getSourceFolder()}/modules/common/views/partials/header.partial.html`),
            fs.readFile(`${helpers.getSourceFolder()}/modules/pages/${req.item}/views/${req.item}.html`),
            fs.readFile(`${helpers.getSourceFolder()}/modules/common/views/partials/footer.partial.html`)
        ];

        /**
         * readFile is a promise, so we need to use Promise API
         */
        Promise.all(files)
            .then(files => files.map(file => file.toString("utf-8")))
            .then(files => files.map(file => _.template(file)(req)))
            .then(files => {
                /**
                 * Join all the files into a single array
                 * @type {any}
                 */
                const content = files.join("");

                /**
                 * Let's use sha256 as a means to get an ETag
                 */
                const hash = crypto
                    .createHash("sha256")
                    .update(content)
                    .digest("hex");

                /**
                 * Set the ETag and cache
                 */
                res.set({
                    "ETag": hash,
                    "Cache-Control": "public, no-cache"
                });

                /** Send the the server side rendered content! **/
                res.send(content);
            })
            .catch(error => {
                if(error.code === "ENOENT") {
                    res.status(404).send("File not found.");
                } else if(!isBuild) {
                    res.status(500).send(error.toString());
                }
            });
    }

});

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
    server.listen(3000, _ => console.log("Server running on port 3000"));

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
    }, app).listen(process.env.PORT, _ => {
        console.log(`Server running on port ${process.env.PORT}`)
    });

}
