import App from "app/app";
import Marionette, { View } from "marionette";
import NavigationView from "modules/common/views/navigation/navigation";
import {attribute, className, tagName, template, on} from "modules/common/controllers/decorators";
import DemoComponent from "modules/common/components/demo-component";
import LoginComponent from "modules/common/components/login-component";
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
class HomeView extends View {

    constructor (...args) {
        super(args);
    }

    /**
     * When the template of the page has been updated, re render the template
     * (This won't preserve state)
     */
    initialize () {
        var that = this;
        if(module.hot){
            /** Require the template & re-render :) **/
            module.hot.accept("./home.html", () => this.$el.html(_.template(require("./home.html"))));
            module.hot.accept("modules/common/components/login-component", () => {
                that.registerComponent(
                    "login-component",
                    System.import("modules/common/components/login-component"),
                    that.$el.find("#component-container")
                );

                that.render();
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
        let $componentContainer = this.$el.find("#component-container");
        App.getNavigationContainer().show(Navigation);
        Navigation.setItemAsActive("home");

        this.registerComponent("demo-component", DemoComponent, $componentContainer);
        this.registerComponent("login-component", LoginComponent, $componentContainer);

        /** We can listen to events emitted by the component. **/
        this.componentChannels["login-component"].on("attached", component => console.log("Attached", component));
    }

    /**
     * Register the component.
     *
     * @param componentName {String} Name the component will be registered under.
     * @param component {HTMLElement} The component you're registering.
     * @param el {jQuery} Container/Element you're putting the component into.
     * @param properties {Object} Properties you wish to apply to the component.
     */
    registerComponent (componentName, component, el, properties) {
        let Component = App.Compontents;
        Component.register(componentName, component, properties);

        let demoElem = Component.getComponent(componentName);

        this.components[demoElem.elementName] = demoElem.component;
        this.componentChannels[demoElem.elementName] = Radio.channel(`components:${componentName}`);
        el.append(demoElem.component);
    }
}

export default HomeView;