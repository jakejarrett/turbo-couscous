/**
 * Decorator.js
 *
 * This provides common decorators for Marionette/Backbone for syntax sugar.
 * @param value
 * @returns {decorator}
 */
export function tagName(value) {
    /**
     * Return a decorator function
     */
    return function decorator(target) {
        target.prototype.tagName = value;
    };
}

export function className(value) {
    /**
     * Return a decorator function
     */
    return function decorator(target) {
        target.prototype.className = value;
    };
}

export function active(value) {
    /**
     * Return a decorator function
     */
    return function decorator(target) {
        target.prototype.active = value;
    };
}

export function template(value, model) {
    if(model === undefined) model = {};

    /**
     * Return a decorator function
     */
    return function decorator(target) {
        target.prototype.template = _.template(value, model);
    };
}

export function on(eventName){
    /**
     * Return a decorator function
     */
    return function(target, name, descriptor){
        if(!target.events) {
            target.events = {};
        }
        if(_.isFunction(target.events)) {
            throw new Error("The on decorator is not compatible with an events method");
            return;
        }
        if(!eventName) {
            throw new Error("The on decorator requires an eventName argument");
        }
        target.events[eventName] = name;
        return descriptor;
    };
}