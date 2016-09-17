"use strict";

/** Dependencies **/
const express = require("express");
const path = require("path");
const httpProxy = require("http-proxy");
const http = require("http");
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
    // Matches paths like `/`, `/index.html`, `/about/` or `/about/index.html`.
    toplevelSection: /([^/]*)(\/|\/index.html)$/,

    // Regex to test if it contains /build/ inside of the url
    isBuildSection: /(\/build)$/,

    urlNotFound (res) {
        let files = [
            fs.readFile(`${helpers.getSourceFolder()}/modules/common/views/partials/header.partial.html`),
            fs.readFile(`${helpers.getSourceFolder()}/modules/pages/404/views/404.html`),
            fs.readFile(`${helpers.getSourceFolder()}/modules/common/views/partials/footer.partial_404.html`)
        ];
        Promise.all(files)
            .then(files => files.map(f => f.toString("utf-8")))
            .then(files => files.map(f => _.template(f)(req)))
            .then(files => {
                const content = files.join("");
                // Let's use sha256 as a means to get an ETag
                const hash = crypto
                    .createHash("sha256")
                    .update(content)
                    .digest("hex");

                res.set({
                    "ETag": hash,
                    "Cache-Control": "public, no-cache"
                });

                // 404
                res.status(404)
                    .send(content);
            });
    }
};

/**
 * Based on the code from the Google chrome live stream for Server side rendering
 *
 * @see https://github.com/GoogleChrome/ui-element-samples/blob/gh-pages/server-side-rendering/index.js
 */
app.get(serverSideRendering.toplevelSection, (req, res) => {
    /**
     * Extract the menu item name from the path and attach it to
     * the request to have it available for template rendering.
     */
    req.item = req.params[0] || "home";

    // If its the build folder, return the request file :)
    if(serverSideRendering.isBuildSection.exec(req.params[0])) res.send(req.params[0]);

    // Files to send.
    let files = [
        fs.readFile(`${helpers.getSourceFolder()}/modules/common/views/partials/header.partial.html`),
        fs.readFile(`${helpers.getSourceFolder()}/modules/pages/${req.item}/views/${req.item}.html`),
        fs.readFile(`${helpers.getSourceFolder()}/modules/common/views/partials/footer.partial.html`)
    ];

    Promise.all(files)
        .then(files => files.map(file => file.toString("utf-8")))
        .then(files => files.map(file => _.template(file)(req)))
        .then(files => {
            const content = files.join("");
            // Let's use sha256 as a means to get an ETag
            const hash = crypto
                .createHash("sha256")
                .update(content)
                .digest("hex");

            res.set({
                "ETag": hash,
                "Cache-Control": "public, no-cache"
            });
            res.send(content);
        })
        .catch(error => {
            if(error.code === "ENOENT") {
                res.status(404).send("File not found.");
            } else {
                res.status(500).send(error.toString());
            }
        });
});

// Fallthrough
app.use(express.static(helpers.getPublicPath()));

if (!helpers.isProduction()) {
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

    /**
     * We need to use basic HTTP service to proxy
     * websocket requests from webpack
     */
    var server = http.createServer(app);
    server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));
    server.listen(3000, () => console.log("Server running on port 3000"));

} else {
    /**
     * Run the server without any development helpers
     */
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
}
