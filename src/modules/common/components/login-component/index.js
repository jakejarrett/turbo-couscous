import Template from "./index.html";
import * as Styles from "./style.scss";
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
        let shadowDom = this.createShadowRoot();
        console.log(shadowDom);
        shadowDom.innerHTML = `${template}`;
    }

    attachedCallback() {
        Radio.channel("components:login-component").trigger("attached", this);
        this.style = "input { background: red; }"
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

    set style (stylesheet) {
        return this;
    }

}

/**
 *  Export the Component
 *
 * @exports LoginComponent
 */
export default LoginComponent;