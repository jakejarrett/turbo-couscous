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
    template() {
        return _.template(Template);
    },

    /**
     * Remove active class from navigation and add active to a specified element
     *
     * @param item {String} Identifier for element you wish to find
     */
    setItemAsActive(item) {
        this.$el.find(".active").removeClass("active");
        var $el = this.$el.find("#" + item);
        $el.addClass("active").children().html(`${$el.children().html()} <span class="sr-only">(current)</span>`);
    }
});

/**
 * Export the view
 *
 * @exports NavigationView
 */
export default NavigationView;
