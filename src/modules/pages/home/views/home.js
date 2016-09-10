import App from "app/app";
import * as Marionette from "marionette";
import NavigationView from "modules/common/views/navigation/navigation";
import Template from "./home.html";
import Styles from "./home.scss";

/**
 * Home view
 *
 * @module modules/pages/home
 */
let HomeView = Marionette.View.extend({

    /**
     * Give the parent element a class
     */
    className: "home",

    /**
     * Returns a rendered template
     *
     * @param stylesheet
     * @returns {*|Function}
     * @protected
     */
    template (stylesheet) {
        return _.template(Template);
    },

    /**
     * Hot module replacement.
     * Get them while they're hot!
     */
    initialize () {
        if(module.hot){
            module.hot.accept("modules/common/views/navigation/navigation", function(){
                /** Re require sub views **/
                let Nav = require("modules/common/views/navigation/navigation");
                let Navigation =  new Nav.default();
                App.getNavigationContainer().show(Navigation);
                Navigation.setItemAsActive("home");
            });
        }
    },

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
});

/**
 * Export the view
 *
 * @exports HomeView
 */
export default HomeView;
