/**
 * Decorator.js
 *
 * This provides common decorators for Marionette/Backbone to clean up the code.
 *
 * @param value
 * @returns {Function} A decorator function.
 */

/**
 * Tag name decorator
 *
 * @param value {String} The tag name of the element. (div/li etc)
 * @returns {Function} The tagName decorator
 */
export function tagName(value) {
    /**
     * Return a decorator function
     */
    return function decorator(target) {
        target.prototype.tagName = value;
    };
}

/**
 * Class name decorator
 *
 * @param value {String} The class you wish to apply to the element
 * @returns {Function} The clasName decorator
 */
export function className(value) {
    /**
     * Return a decorator function
     */
    return function decorator(target) {
        target.prototype.className = value;
    };
}

/**
 * Active decorator
 *
 * This provides a decorator for the navigation to set an active attribute on construct.
 *
 * @param value {String} The ID of the active element in the navigation.
 * @returns {Function} The active decorator
 */
export function active(value) {
    /**
     * Return a decorator function
     */
    return function decorator(target) {
        target.prototype.active = value;
    };
}

/**
 * Template decorator
 *
 * @param value {String|HTMLElement} The template you want to get rendered, It gets passed through _.template
 * @param model {Object} Backbone Model
 * @returns {Function} The template decorator
 */
export function template(value, model) {
    if(model === undefined) model = {};

    /**
     * Return a decorator function
     */
    return function decorator(target) {
        target.prototype.template = _.template(value, model);
    };
}

/**
 * Event decorator
 *
 * This provides a much more declarative way to assign event listeners via decorators.
 *
 * @param eventName {String} The event you want to bind (EG/ "click div")
 * @returns {Function} The "on" decorator (@on)
 */
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

/**
 * Controller
 *
 * @param value {Function} The construct of the controller ( @controller(new ConstructedObject) )
 * @returns {Function} The controller decorator
 */
export function controller(value) {
    /**
     * Return a decorator function
     */
    return function decorator(target) {
        target.prototype.controller = value;
    };
}

/**
 * AppRoute decorator
 *
 * @param eventName {String} The app route you want to assign (EG/ @appRoute("home(/)") )
 * @returns {Function} The appRoute decorator
 */
export function appRoute(eventName){
    /**
     * Return a decorator function
     */
    return function(target, name, descriptor){
        if(!target.appRoutes) {
            target.appRoutes = {};
        }
        if(_.isFunction(target.appRoutes)) {
            throw new Error("The on decorator is not compatible with an appRoutes method");
            return;
        }
        if(!eventName) {
            throw new Error("The on decorator requires an appRoute argument");
        }
        target.appRoutes[eventName] = name;
        return descriptor;
    };
}

/**
 * Attribute decorator
 *
 * This provides a decorator for the any module to add in properties/attributes on the root.
 *
 * @param attribute {String} The attribute/property you wish to apply.
 * @param value {String} The initial value of the property/attribute.
 * @returns {Function} The active decorator
 */
export function attribute(attribute, value) {
    /**
     * Return a decorator function
     */
    return function decorator(target) {
        target.prototype[attribute] = value;
    };
}