import { View } from "marionette";
import { template, on } from "marionette-decorators";
import { active } from "../../controllers/decorators";
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

    template () {
        return _.template(Template)({
            Styles: Styles
        })
    }

    /**
     * When the template of the page has been updated, re render the template
     * (This won't preserve state)
     */
    initialize () {
        const that = this;

        if(module.hot){
            /** Require the template & re-render :) **/
            module.hot.accept("./navigation.html", () => {
                that.$el.html(_.template(require("./navigation.html")));
                that.setItemAsActive(that.active);
            });
        }

        console.log(Styles);
    }

    /**
     * Remove active class from navigation and add active to a specified element
     *
     * @param item {String} Identifier for element you wish to find
     */
    setItemAsActive (item) {
        /** Store active in memory **/
        this.active = item;

        this.$el.find(`${Styles.active}`)
            .removeClass(`${Styles.active}`)
            .find(".sr-only")
            .remove();

        let $el = this.$el.find("#" + item);
        $el.addClass(`${Styles.active}`)
            .children()
            .html(`${$el.children().html()} <span class="sr-only">(current)</span>`);
    }

}

/**
 * Export the view
 *
 * @exports NavigationView
 */
export default NavigationView;
