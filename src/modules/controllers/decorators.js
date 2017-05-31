/**
 * Decorator.js
 *
 * This provides common decorators for Marionette/Backbone to clean up the code.
 *
 * @param value
 * @returns {Function} A decorator function.
 */
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