import App from "app/app";
import * as Mn from "marionette";
import NavigationView from "modules/common/views/navigation/navigation";
import {className, tagName, template, on} from "modules/common/controllers/decorators";
import DemoComponent from "modules/common/components/demo-component";
import Template from "./home.html";
import Styles from "./home.scss";

/**
 * Home view
 *
 * @module modules/pages/home
 * @exports HomeView
 */
@className("home")
@template(Template)
class HomeView extends Mn.View {

    constructor (...args) {
        super(args);
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

        this.registerComponent(DemoComponent, {
            text: "This was registered on render!"
        });
    }

    registerComponent (component, properties, appendTo) {
        let Component = document.registerElement("demo-component", DemoComponent);

        let elem = new Component;

        elem.properties = properties;

        if(!appendTo) {
            this.$el.append(elem);
        } else {
            appendTo.append(elem);
        }
    }
}

export default HomeView;