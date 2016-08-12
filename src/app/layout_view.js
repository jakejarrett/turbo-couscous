import * as Marionette from "marionette";
import _ from "underscore";
import Template from "./layout-template.html";

/**
 * Create a view & subdivide it into regions so we can split up
 * the navigation, content etc into their own small pieces.
 *
 * @exports Marionette.View
 */
export default Marionette.View.extend({

    /**
     * The element we want to render to
     *
     * @protected
     */
    el: "#app-layout",

    /**
     * Template
     *
     * @returns {Function} Rendered template
     * @protected
     */
    template: function () {
        return _.template(Template);
    },

    /**
     * Split up app into regions, navigation & content.
     *
     * @protected
     */
    regions: {
        navigation: "#navigation",
        content: "#app-main"
    }
});
