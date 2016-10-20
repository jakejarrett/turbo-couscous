import Styles from "!css?modules!sass!./style.scss";
import Template from "./index.html";
import {on} from "../controllers/decorators";
import Component from "marionette.component";

/**
 * Entry point for demo-component
 */
class DemoComponent extends Component {

    /**
     * Setup our component.
     */
    constructor (elementName) {
        const renderedTemplate = _.template(Template)();

        super({
            elementName: elementName,
            element: renderedTemplate,
            stylesheet: Styles
        });

        return this.element;
    }

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