import Styles from "!css?modules!sass!./style.scss";
import Template from "./index.html";
import { Component, on } from "marionette.component";

/**
 * Entry point for demo-component
 */
class DemoComponent extends Component {

    /**
     * Setup our component.
     */
    constructor (elementName) {
        const renderedTemplate = _.template(Template)();

        super(elementName, renderedTemplate, Styles);

        return this.element;
    }

    /**
     * When the user clicks the element, console log "hello" and the click event.
     *
     * @param event {Event} The click event.
     */
    @on("click")
    onUserClick (event) {
        console.log("hello", event);
    }
}

/**
 *  Export the Component
 *
 * @exports DemoComponent
 */
export default DemoComponent;