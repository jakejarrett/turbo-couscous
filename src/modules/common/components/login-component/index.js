import Template from "./index.html";
import * as Styles from "!css?modules!sass!./style.scss";
import * as Radio from "backbone.radio";
import Component from "marionette.component";

/**
 * Entry point for login component
 */
class LoginComponent extends Component {

    /**
     * Setup our component.
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
 * @exports LoginComponent
 */
export default LoginComponent;