import $ from "jquery";
import _ from "lodash";
import Radio from "backbone.radio";
import Backbone from "backbone";
import Marionette, { Application } from "marionette";
import LayoutView from "./layout_view";
import ComponentController from "modules/common/controllers/component-controller";
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
    onShow () {
        /**
         * We should only have one body click event that is propagated via Backbone.Radio
         */
        $("body").on("click", (ev) => {

            /**
             * Triggers app:onBodyClick event
             *
             * @event app:onBodyClick
             * @memberof App
             * @example
             * var globalChannel = Backbone.Radio.channel("global");
             * var that = this;
             *
             * globalChannel.trigger("app:onBodyClick", (e) => {
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
App.on("start", () => {
    if (Backbone.history) {
        Backbone.history.start({
            pushState: true
        });
    }

    /**
     * Setup Service worker!
     */
    if("serviceWorker" in navigator) {
        // navigator.serviceWorker.register("/sw.js", { scope: "/" })
        //     .then(registration => console.log("Service Worker Registered"));
        //
        // navigator.serviceWorker.ready.then(registration => console.log("Service Worker Ready"));
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
App.getNavigationContainer = () => App.layoutView.getRegion("navigation");

/**
 * Returns the content container
 *
 * @returns {HTMLElement} The content region
 * @public
 */
App.getContentContainer = () => App.layoutView.getRegion("content");

/**
 * Notify the application when the page has changed
 *
 * @event app:pageChange
 * @memberof App
 * @example
 * var globalChannel = Backbone.Radio.channel("global");
 * var that = this;
 *
 * // Clean up the dom when the page changes
 * globalChannel.trigger("app:pageChange", ()  => that.janitorialDuties());
 */
App.layoutView.on("empty", (view) => {
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
 * // Clean up the dom before the page changes
 * globalChannel.trigger("app:pageWillChange", ()  => that.janitorialDuties());
 */
App.layoutView.on("before:empty", (view) => globalChannel.trigger("app:pageWillChange"));

/**
 * Provide a singleton component controller for the app.
 */
App.Compontents = new ComponentController;

/**
 * Export the application
 *
 * @exports App
 */
export default App;
