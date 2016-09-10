import * as Marionette from "marionette";
import _ from "underscore";
import Template from "./layout-template.html";

let ContentRegion = Marionette.Region.extend({
    attachHtml (view) {
        /**
         * Fade the element in :)
         */
        this.$el.empty().append(view.el);
        this.$el.hide().fadeIn();
    }
});

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
     * Preserve HTML
     */
    template: false,

    /**
     * Split up app into regions, navigation & content.
     *
     * @protected
     */
    regions: {
        navigation: "#navigation",
        content: {
            regionClass: ContentRegion,
            el: "#app-main"
        }
    }
});
