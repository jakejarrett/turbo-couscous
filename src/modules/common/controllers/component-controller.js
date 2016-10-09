import * as Mn from "backbone.marionette";
import {attribute} from "modules/common/controllers/decorators";

@attribute("components", {})
class ComponentController extends Mn.Object {

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
        /**
         * If it's registered already, return the registered one
         */
        if(this.isRegistered(componentName)) {
            return document.createElement(componentName);
        }

        let Component = document.registerElement(componentName, component);

        let elem = new Component;
        elem.properties = properties;
        this.components[componentName] = {
            component: elem,
            elementName: componentName
        };
    }

    /**
     * Returns a registered component
     *
     * @param name {String} Name of the component you wish to lookup.
     * @returns {*}
     */
    getComponent(name) {
        return this.components[name];
    }

    get registeredComponents () {
        return this.components;
    }

}

export default ComponentController;