import Styles from "!css?modules!sass!./style.scss";
import Template from "./index.html";
import { Component, on } from "@jakejarrett/marionette-component";

/**
 * Entry point for demo-component
 */
class DemoComponent extends Component {

    /**
     * Setup our component.
     */
    constructor (elementName, properties, localName) {
        super(elementName, localName);

        this.render(elementName);

        return this;
    }

    render (elementName, props) {
        let data = {
            properties: props
        };

        const renderedTemplate = _.template(Template)(data);

        this.renderComponent(elementName, renderedTemplate, Styles);
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