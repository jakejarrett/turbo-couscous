import * as Marionette from "marionette";
import App from "app/app";

class HomeRouterController extends Marionette.Object {

    /**
     * Start index route
     *
     * for some reason, router breaks if it doesn't have this present, but does not use this function anyway.
     */
    startIndexRoute () {}

}

/**
 * Export the controller
 *
 * @exports HomeRouterController
 */
export default HomeRouterController;
