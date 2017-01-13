import App from "app/app";
import { Component, on } from "@jakejarrett/marionette-component";
import Template from "./index.html";
import * as Styles from "!css?modules!sass!./style.scss";

/**
 * Entry point for login component
 */
class LoginComponent extends Component {

    /**
     * Setup our component.
     */
    constructor (elementName, properties, localName) {
        super(elementName, localName);

        this.render(elementName);

        return this;
    }

    render (elementName) {
        const renderedTemplate = _.template(Template)();
        const state = new Backbone.Model();

        this.renderComponent(elementName, renderedTemplate, Styles, state);
    }

    /**
     * When the user submits the form.
     *
     * @param event {Event} The submit event.
     */
    @on("submit")
    onFormSubmit (event) {
        event.preventDefault();
        const supportsSrcElement = undefined !== event.srcElement;
        const target = event.target;
        let elem = target.querySelectorAll("input");

        /** If shadowRoot is present, we'll get the shadowRoot, otherwise it doesn't support shadowRoot **/
        if(target.shadowRoot) {
            elem = target.shadowRoot.querySelectorAll("input");
        }

        _.each(elem, (element, index) => console.log(element.value));

        this.setState("loggedIn", true);
    }

    setState (attribute, state) {
        this.state.set(attribute, state);
        this.radioChannel.trigger("stateChange", {
            attribute: attribute,
            state: state
        });
    }

}

/**
 *  Export the Component
 *
 * @exports LoginComponent
 */
export default LoginComponent;