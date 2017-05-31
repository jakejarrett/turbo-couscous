import App from "app/app";
import { View } from "backbone.marionette";
import NavigationView from "modules/components/navigation";
import { template } from "marionette-decorators";
import Template from "./home.html";
import "./home.scss";

/**
 * Home view
 *
 * @module modules/views/home
 * @exports HomeView
 */
@template(Template)
class HomeView extends View {

    /** Initial Properties **/
    className = "home";

    constructor () {
        super();
    }

    /**
     * When the template of the page has been updated, re render the template
     * (This won't preserve state)
     */
    initialize () {
        const that = this;

        if (module.hot) {
            /** Require the template & re-render :) **/
            module.hot.accept("./home.html", (res) => {
                that.$el.find("#content-container").html(_.template(require("./home.html")));
            });
        }
    }

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender () {
        let Navigation =  new NavigationView();
        App.navigationRegion.show(Navigation);
        Navigation.setItemAsActive("home");
    }

}

export default HomeView;