import * as Backbone from "backbone";
import Marionette, { View } from "marionette";
import {active, template, on} from "modules/common/controllers/decorators";
import Template from "./navigation.html";
import Styles from "./navigation.scss";
import Router from "app/routes";

/**
 * Navigation view
 *
 * @module modules/common/views/navigation
 */
@active("home")
@template(Template)
class NavigationView extends View {

    /**
     * When the template of the page has been updated, re render the template
     * (This won't preserve state)
     */
    initialize () {
        var that = this;

        if(module.hot){
            /** Require the template & re-render :) **/
            module.hot.accept("./navigation.html", () => {
                that.$el.html(_.template(require("./navigation.html")));
                that.setItemAsActive(that.active);
            });
        }
    }

    /**
     * Remove active class from navigation and add active to a specified element
     *
     * @param item {String} Identifier for element you wish to find
     */
    setItemAsActive (item) {
        /** Store active in memory **/
        this.active = item;

        this.$el.find(".active")
            .removeClass("active")
            .find(".sr-only")
            .remove();

        let $el = this.$el.find("#" + item);
        $el.addClass("active")
            .children()
            .html(`${$el.children().html()} <span class="sr-only">(current)</span>`);
    }

    /**
     * When the nav item was clicked, we pass navigation to backbone instead.
     * @param e {Event} The click event
     */
    @on("click .nav-item")
    onNavItemClick (e) {
        e.preventDefault();
        Router.navigate(e.target.getAttribute("href"), {trigger: true});
    }
}

/**
 * Export the view
 *
 * @exports NavigationView
 */
export default NavigationView;
