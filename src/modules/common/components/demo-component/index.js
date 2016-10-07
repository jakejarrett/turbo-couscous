import Styles from "./style.scss";
import * as Radio from "backbone.radio";

/**
 * Entry point for demo-component
 */
class DemoComponent extends HTMLElement {

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
        this.innerHTML = `
            <div>
                <h1 class="custom__demo-component">
                    Demo component!
                </h1>
            </div>
        `;
    }

    attachedCallback() {
        this.querySelector('.custom__demo-component').innerHTML = this.textValue != null ? this.textValue : this.dataset['text'];
        Radio.channel("components:demo-component").trigger("attached");
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        Radio.channel("components:demo-component").trigger("attributeChanged", {
            attributeName: attrName,
            previousAttribute: oldValue,
            newAttribute: newValue
        });
    }

    detachedCallback () {
        Radio.channel("components:demo-component").trigger("detached");
    }

    set properties(prop) {
        this.textValue = prop.text;
    }

    get text() {
        return this.textValue;
    }

}

/**
 *  Export the Component
 *
 * @exports DemoComponent
 */
export default DemoComponent;