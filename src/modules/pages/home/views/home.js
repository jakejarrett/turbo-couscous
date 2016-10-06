import App from "app/app";
import * as Mn from "marionette";
import NavigationView from "modules/common/views/navigation/navigation";
import Template from "./home.html";
import Styles from "./home.scss";

/**
 * Home view
 *
 * @module modules/pages/home
 * @exports HomeView
 */
class HomeView extends Mn.View {

    constructor (...args) {
        super(args);
        this.className = "home";
    }

    /**
     * Returns a rendered template
     *
     * @param stylesheet
     * @returns {*|Function}
     * @protected
     */
    static template (stylesheet) {
        return _.template(Template);
    }

    /**
     * When the template of the page has been updated, re render the template
     * (This won't preserve state)
     */
    initialize () {
        if(module.hot){
            /** Require the template & re-render :) **/
            module.hot.accept("./home.html", () => this.$el.html(_.template(require("./home.html"))));
        }
    }

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender () {
        let Navigation =  new NavigationView();
        App.getNavigationContainer().show(Navigation);
        Navigation.setItemAsActive("home");
    }
}

export default HomeView;