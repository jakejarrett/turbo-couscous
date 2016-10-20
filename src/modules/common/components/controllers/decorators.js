/**
 * Event decorator
 *
 * Event listeners for components.
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

        target.addEvent(eventName, name, target);

        return descriptor;
    };
}