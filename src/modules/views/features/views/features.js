import App from "app/app";
import { View } from "marionette";
import { className, template } from "marionette-decorators";
import NavigationView from "modules/components/navigation";
import Template from "./features.html";
import Styles from "./features.scss";

/**
 * Features view
 *
 * @module modules/pages/features
 */
@className("features")
@template(Template)
class FeaturesView extends View {

    /**
     * When the template of the page has been updated, re render the template
     * (This won't preserve state)
     */
    initialize () {
        var that = this;

        if(module.hot) {
            /** Require the template & re-render :) **/
            module.hot.accept("./features.html", () => that.$el.html(_.template(require("./features.html"))));
        }
    }

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender () {
        const Navigation =  new NavigationView();
        App.navigationRegion.show(Navigation);
        Navigation.setItemAsActive("features");
    }
}

/**
 * Export the view
 *
 * @exports FeaturesView
 */
export default FeaturesView;
