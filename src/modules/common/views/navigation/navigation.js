import * as Backbone from "backbone";
import * as Marionette from "marionette";
import Template from "./navigation.html";
import Styles from "./navigation.scss";

/**
 * Navigation view
 *
 * @module modules/common/views/navigation
 */
let NavigationView = Marionette.View.extend({

    /**
     * Returns a rendered template
     *
     * @returns {Function} The rendered template
     */
    template: function () {
        return _.template(Template);
    },

    /**
     * Remove active class from navigation and add active to a specified element
     *
     * @param item {String} Identifier for element you wish to find
     */
    setItemAsActive: function(item) {
        this.$el.find(".active").removeClass("active");
        this.$el.find("#" + item).addClass("active");
    }
});

/**
 * Export the view
 *
 * @exports NavigationView
 */
export default NavigationView;