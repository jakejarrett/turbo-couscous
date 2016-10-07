import * as Marionette from "marionette";
import App from "app/app";

class FeaturesRouterController extends Marionette.Object {

    /**
     * Start features route
     *
     * for some reason, router breaks if it doesn't have this present, but does not use this function anyway.
     */
    startFeaturesRoute () {}

}

/**
 * Export the controller
 *
 * @exports FeaturesRouterController
 */
export default FeaturesRouterController;
