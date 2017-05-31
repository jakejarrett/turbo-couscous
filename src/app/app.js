import { attribute } from "marionette-decorators";
import $ from "jquery";
import Radio from "backbone.radio";
import Backbone from "backbone";
import { Application } from "marionette";
import LayoutView from "./layout_view";
import TurboHistory from "../overrides/router";
import Router from "./routes";

/**
 * Setup radio channels
 */
const globalChannel = Radio.channel("app");

/**
 * Setup the app & invoke it, then provide access to the invoked App variable.
 *
 * @type {Marionette.Application}
 * @module App
 * @namespace App
 */
@attribute("region", "body")
class TurboApp extends Application {

    /**
     * When we call new TurboApp() we setup some stuff.
     *
     * @param options {Object} Initialization options
     */
    initialize (options) {
        super.initialize(options);

        this.layoutView = new LayoutView();
        this.turboHistory = new TurboHistory();

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
        this.listenTo(this.layoutView, "empty", _ => {
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
        this.listenTo(this.layoutView, "before:empty", _ => globalChannel.trigger("app:pageWillChange"));
    }

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

    /**
     * When the application starts, setup some stuff that can only be accessed after the app has started
     */
    onStart () {
        if (Backbone.history) {
            Backbone.history.start();
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

        this.layoutView.render();
    }

    /**
     * Get the content region
     *
     * @returns {Region}
     */
    get contentRegion () {
        return this.layoutView.getRegion("content");
    }

    get navigationRegion () {
        return this.layoutView.getRegion("navigation");
    }

}

/** Invoke Application **/
const App = new TurboApp();

/**
 * Export the application
 *
 * @exports App
 */
export default App;
