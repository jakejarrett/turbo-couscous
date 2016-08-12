import $ from "jquery";
import _ from "lodash";
import Radio from "backbone.radio";
import Backbone from "backbone";
import * as Marionette from "marionette";
import LayoutView from "./layout_view";
import Router from "./routes";

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
            globalChannel.trigger("onBodyClick", ev);
        });
    }
});

/** Invoke Application **/
let App = new application();

/**
 * Start route controller
 */
App.on("start", function() {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

/**
 * Setup a region for the app.
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
    globalChannel.off("onBodyClick");
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
