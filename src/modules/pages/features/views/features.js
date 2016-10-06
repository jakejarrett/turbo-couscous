import App from "app/app";
import * as Marionette from "marionette";
import {className, tagName, template, on} from "modules/common/controllers/decorators";
import NavigationView from "modules/common/views/navigation/navigation";
import Template from "./features.html";
import Styles from "./features.scss";

/**
 * Features view
 *
 * @module modules/pages/features
 */
@className("features")
@template(Template)
class FeaturesView extends Marionette.View {

    /**
     * When the template of the page has been updated, re render the template
     * (This won't preserve state)
     */
    initialize () {
        if(module.hot){
            /** Require the template & re-render :) **/
            module.hot.accept("./features.html", () => this.$el.html(_.template(require("./features.html"))));
        }
    }

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender () {
        var Navigation =  new NavigationView();
        App.getNavigationContainer().show(Navigation);

        Navigation.setItemAsActive("features");
    }
}

/**
 * Export the view
 *
 * @exports FeaturesView
 */
export default FeaturesView;
