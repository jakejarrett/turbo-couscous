import App from "app/app";
import * as Mn from "marionette";
import NavigationView from "modules/common/views/navigation/navigation";
import {attribute, className, tagName, template, on} from "modules/common/controllers/decorators";
import DemoComponent from "modules/common/components/demo-component";
import ComponentController from "modules/common/controllers/component-controller";
import * as Radio from "backbone.radio";
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
@attribute("components", {})
@attribute("componentChannels", {})
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

        this.registerComponent("demo-component", DemoComponent, {
            text: "This was registered on render!"
        });
    }

    registerComponent (componentName, component, properties) {
        let Component = new ComponentController;

        Component.register(componentName, component, properties);

        let demoElem = Component.registeredElem;

        this.components[Component.componentName] = demoElem;
        this.componentChannels[Component.componentName] = Radio.channel("components:demo-component");
        this.$el.append(demoElem);


        /**
         * When the component gets rendered, it will send out an event saying that it was attached.
         */
        this.componentChannels[Component.componentName].on("attached", () => console.log("Attached"))
    }
}

export default HomeView;