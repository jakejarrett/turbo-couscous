import Backbone from "backbone";
import Styles from "!css?modules!sass!./style.scss";
import Template from "./index.html";
import Component from "marionette.component";

/**
 * Entry point for demo-component
 */
class DemoComponent extends Component {

    /**
     * Always call to super in HTMLElement so we inherit the original Element.
     */
    constructor () {
        const elementName = "hello-world";
        const renderedTemplate = _.template(Template)();

        super({
            elementName: elementName,
            element: renderedTemplate,
            stylesheet: Styles
        });

        return this.element;

    }

}

/**
 *  Export the Component
 *
 * @exports DemoComponent
 */
export default DemoComponent;