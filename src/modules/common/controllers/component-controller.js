import Marionette from "marionette";
import {attribute} from "./decorators";

/**
 * Marionette Component controller.
 *
 * This abstracts out a fair chunk of the boilerplate code that's associated with using Web Components.
 *
 * @author Jake Jarrett <jakeryanjarrett@gmail.com>
 */
@attribute("__components", {})
class ComponentController extends Marionette.Object {

    /**
     * Constructor
     *
     * @param args
     */
    constructor (...args) {
        super(...args);
    }

    /**
     * Returns if the element is registered in the DOM or not
     *
     * @param name {String} Name of the custom element
     * @returns {boolean} True if the element is registered.
     */
    isRegistered (name) {
        return document.createElement(name).constructor !== HTMLElement;
    }

    /**
     * Register an element & store it in an array.
     *
     * @param componentName {String} Name of the element you're registering.
     * @param component {HTMLElement} The element you're constructing.
     * @param properties {Object} The properties you wish to set to the element.
     * @returns {Element}
     * @public
     */
    register (componentName, component, properties) {
        let ComponentModule = new component(componentName, properties);

        /**
         * If it's registered already, return the registered one
         */
        if(this.isRegistered(componentName)) {
            return document.createElement(componentName);
        }

        console.log(ComponentModule.element.prototype);

        let tempObj = Object.create(ComponentModule.element.prototype);

        /**
         * Create a prototype of our component, otherwise it will throw errors.
         */
        let Component = document.registerElement(componentName, {
            prototype: tempObj
        });

        const elem = new Component;

        // ComponentModule.element = tempObj;

        if(!(CustomElements.useNative)) {
            WebComponents.ShadowCSS.shimStyling(elem.shadowRoot, `${componentName}`);
        }

        if(undefined !== properties) {
            elem.properties = properties;
        }

        this.__components[componentName] = {
            component: elem,
            componentModule: ComponentModule,
            elementName: componentName,
            radioChannel: ComponentModule.radioChannel
        };
    }

    /**
     * Returns a registered component
     *
     * @param name {String} Name of the component you wish to lookup.
     * @returns {*}
     */
    getComponent(name) {
        return this.__components[name];
    }

    /**
     * Return the registered components
     *
     * @returns {Object} Returns an object of registered components
     */
    get registeredComponents () {
        return this.__components;
    }

}

export default ComponentController;