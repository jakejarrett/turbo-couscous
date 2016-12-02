import App from "app/app";
import { View } from "@jakejarrett/marionette-component";
import NavigationView from "modules/common/views/navigation/navigation";
import {attribute, className, tagName, template, on} from "marionette-decorators";
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

            module.hot.accept("modules/common/components/login-component", elem => {
                that.getComponent("login-component").component.updateElement();
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
        App.getNavigationContainer().show(Navigation);
        Navigation.setItemAsActive("home");

        this.setupComponents();
        this.setupComponentEventListeners();
    }

    setupComponents () {
        let $componentContainer = this.el.querySelector("#component-container");

        this.registerComponent(App.Compontents, "demo-component", DemoComponent, $componentContainer);
        this.registerComponent(App.Compontents, "login-component", LoginComponent, $componentContainer);
    }

    setupComponentEventListeners () {
        const loginComponent = this.getComponent("login-component").radioChannel;
        /** We can listen to events emitted by the component. **/
        loginComponent.on("stateChange", stateChange => {
            console.log(stateChange)
        });
    }

    onBeforeDestroy () {
        this.getComponent("login-component").radioChannel.off("stateChange");
        this.clearComponents();
    }

}

export default HomeView;