import App from "app/app";
import { View } from "marionette";
import NavigationView from "modules/common/views/navigation/navigation";
import {attribute, className, tagName, template, on} from "modules/common/controllers/decorators";
import DemoComponent from "modules/common/components/demo-component";
import LoginComponent from "modules/common/components/login-component";
import Template from "./home.html";
import "./home.scss";

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

    constructor () {
        super();
    }

    /**
     * When the template of the page has been updated, re render the template
     * (This won't preserve state)
     */
    initialize () {
        var that = this;
        if (module.hot) {
            /** Require the template & re-render :) **/
            module.hot.accept("./home.html", (res) => {
                that.$el.find("#content-container").html(_.template(require("./home.html")));
            });

            module.hot.accept("modules/common/components/login-component", elem => that.components["login-component"].updateElement());
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

        this.setupComponents();
        this.setupComponentEventListeners();
    }

    setupComponents () {
        let $componentContainer = this.$el.find("#component-container");

        this.registerComponent("demo-component", DemoComponent, $componentContainer);
        this.registerComponent("login-component", LoginComponent, $componentContainer);
    }

    setupComponentEventListeners () {
        /** We can listen to events emitted by the component. **/
        this.componentChannels["login-component"].on("stateChange", stateChange => {
            console.log(`New state ${stateChange}`)
        });
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

        let componentObject = Component.getComponent(componentName);

        /** Store references to the component & radio channels **/
        this.components[componentObject.elementName] = componentObject.component;
        this.componentChannels[componentObject.elementName] = componentObject.radioChannel || {};

        el.append(componentObject.component);
    }
}

export default HomeView;