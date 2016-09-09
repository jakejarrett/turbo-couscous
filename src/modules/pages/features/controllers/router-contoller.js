import * as Marionette from "marionette";
import App from "app/app";

let FeaturesRouterController = Marionette.Object.extend({

    /**
     * Start features route
     *
     * ok. so, this isn't related to the function, but if this function isn't here,
     * marionette 3 will throw an error that the controller doesn't have a declaration of
     * this function.
     *
     * so if anyone has a fix for that, that'd be cool.
     */
    startFeaturesRoute: function () {}
});

/**
 * Export the controller
 *
 * @exports FeaturesRouterController
 */
export default FeaturesRouterController;
