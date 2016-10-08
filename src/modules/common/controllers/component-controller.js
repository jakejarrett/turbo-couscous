import * as Mn from "backbone.marionette";

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

    register (componentName, component, properties) {
        if(this.isRegistered(componentName)) {
            return;
        }

        let Component = document.registerElement(componentName, component);

        let elem = new Component;
        elem.properties = properties;
        this.elem = elem;
        this.elemName = componentName;
    }

    get registeredElem () {
        return this.elem;
    }

    get componentName() {
        return this.elemName;
    }

}

export default ComponentController;