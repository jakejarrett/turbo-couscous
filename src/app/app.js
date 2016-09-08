import $ from "jquery";
import _ from "lodash";
import Radio from "backbone.radio";
import Backbone from "backbone";
import * as Marionette from "marionette";
import LayoutView from "./layout_view";
import Router from "./routes";

/**
 * Setup radio channels
 */
let globalChannel = Radio.channel("app");
let routerChannel = Radio.channel("router");

/**
 * Setup the app & invoke it, then provide access to the invoked App variable.
 *
 * @type {Marionette.Application}
 * @module App
 * @namespace App
 */
let application = Marionette.Application.extend({
    /**
     * App region
     */
    region: "body",

    /**
     * When the DOM is shown, lets bind an event listener for the body click.
     */
    onShow: function() {
        /**
         * We should only have one body click event that is propagated via Backbone.Radio
         */
        $("body").on("click", function(ev){
            /**
             * Triggers app:onBodyClick event
             *
             * @event app:onBodyClick
             * @memberof App
             * @example
             * var globalChannel = Backbone.Radio.channel("global");
             * var that = this;
             *
             * globalChannel.trigger("app:onBodyClick", function (e) {
             *      if(e.target.name === 'submit-form') {
             *          // Submit the form
             *      }
             * });
             */
            globalChannel.trigger("app:onBodyClick", ev);
        });
    }
});

/** Invoke Application **/
let App = new application();

/**
 * Start route controller and register a service worker
 */
App.on("start", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }

    /**
     * Setup Service worker!
     */
    if("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js", { scope: "/" })
            .then(function(registration) {
                console.log("Service Worker Registered");
            });

        navigator.serviceWorker.ready.then(function(registration) {
            console.log("Service Worker Ready");
        });
    }

    /**
     * Hide loader
     */
    $(".loader").fadeOut();

});

/**
 * Setup a region for the app & expose it on the App namespace
 * (Essentially providing a singleton)
 *
 * @protected
 */
App.layoutView = new LayoutView();
App.layoutView.render();

/**
 * Returns the navigation container
 *
 * @returns {HTMLElement} The navigation region
 * @public
 */
App.getNavigationContainer = function() {
    return App.layoutView.getRegion("navigation");
};

/**
 * Returns the content container
 *
 * @returns {HTMLElement} The navigation region
 * @public
 */
App.getContentContainer = function() {
    return App.layoutView.getRegion("content");
};

/**
 * Notify the application when the page has changed
 *
 * @event app:pageChange
 * @memberof App
 * @example
 * var globalChannel = Backbone.Radio.channel("global");
 * var that = this;
 *
 * globalChannel.trigger("app:pageChange", function () {
 *      // Clean up, this could be something like grabbing the new model before rendering
 *      that.janitorialDuties();
 * });
 */
App.layoutView.on("empty", function(view){
    globalChannel.trigger("app:pageChange");
    globalChannel.off("app:onBodyClick");
});

/**
 * Notify the application that the page will change.
 *
 * @event app:pageWillChange
 * @memberof App
 * @example
 * var globalChannel = Backbone.Radio.channel("global");
 * var that = this;
 *
 * globalChannel.trigger("app:pageWillChange", function () {
 *      // This could be something like removing a modal or tour guide that
 *      // is not controller by the app's region manager.
 *      that.janitorialDuties();
 * });
 */
App.layoutView.on("before:empty", function(view){
    globalChannel.trigger("app:pageWillChange");
});

/**
 * Export the application
 *
 * @exports App
 */
export default App;
