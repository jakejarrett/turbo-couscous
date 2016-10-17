import Template from "./index.html";
import * as Styles from "!css?modules!sass!./style.scss";
import * as Radio from "backbone.radio";

/**
 * Entry point for login component
 */
class LoginComponent extends HTMLFormElement {

    /**
     * When the element is initialized, we'll create the element
     */
    createdCallback () {
        let template = _.template(Template)();
        let shadowRoot = this.createShadowRoot();
        /** Add the styles directly into the shadow root & then append the rendered template **/
        shadowRoot.innerHTML = `<style>${Styles.toString()}</style>${template}`;
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