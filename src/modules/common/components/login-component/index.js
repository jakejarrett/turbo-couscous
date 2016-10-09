import Template from "./index.html";
import Styles from "./style.scss";
import * as Radio from "backbone.radio";

/**
 * Entry point for login component
 */
class LoginComponent extends HTMLElement {

    /**
     * Always call to super in HTMLElement so we inherit the original Element.
     */
    constructor () {
        super();
    }

    /**
     * When the element is initialized, we'll create the element
     */
    createdCallback () {
        let template = _.template(Template)();
        this.innerHTML = template;
    }

    attachedCallback() {
        Radio.channel("components:login-component").trigger("attached", this);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        Radio.channel("components:login-component").trigger("attributeChanged", {
            attributeName: attrName,
            previousAttribute: oldValue,
            newAttribute: newValue
        });
    }

    detachedCallback () {
        Radio.channel("components:login-component").trigger("detached");
    }

    get text() {
        return this.textValue;
    }

}

/**
 *  Export the Component
 *
 * @exports LoginComponent
 */
export default LoginComponent;