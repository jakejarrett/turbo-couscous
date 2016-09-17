import * as Backbone from "backbone";
import * as Marionette from "marionette";
import Template from "./navigation.html";
import Styles from "./navigation.scss";
import Router from "app/routes";

/**
 * Navigation view
 *
 * @module modules/common/views/navigation
 */
let NavigationView = Marionette.View.extend({

    /** Initial state **/
    active: "home",

    /**
     * Event handlers for the view
     */
    events: {
        "click .nav-item": "onNavItemClick"
    },

    /**
     * When the template of the page has been updated, re render the template
     * (This won't preserve state)
     */
    initialize () {
        if(module.hot){
            /** Require the template & re-render :) **/
            module.hot.accept("./navigation.html", () => {
                this.$el.html(_.template(require("./navigation.html")));
                this.setItemAsActive(this.active);
            });
        }
    },

    /**
     * Returns a rendered template
     *
     * @returns {Function} The rendered template
     */
    template () {
        return _.template(Template);
    },

    /**
     * Remove active class from navigation and add active to a specified element
     *
     * @param item {String} Identifier for element you wish to find
     */
    setItemAsActive (item) {
        /** Store active in memory **/
        this.active = item;

        /** Don't look through the dom if we don't have to **/
        this.$el.find(".active").removeClass("active");
        let $el = this.$el.find("#" + item);
        $el.addClass("active").children().html(`${$el.children().html()} <span class="sr-only">(current)</span>`);
    },

    /**
     * When the nav item was clicked, we pass navigation to backbone instead.
     * @param e {Event} The click event
     */
    onNavItemClick (e) {
        e.preventDefault();
        Router.navigate(e.target.getAttribute("href"), {trigger: true});
    }
});

/**
 * Export the view
 *
 * @exports NavigationView
 */
export default NavigationView;
