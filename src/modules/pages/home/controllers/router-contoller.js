import Marionette, { Object } from "marionette";
import App from "app/app";

class HomeRouterController extends Object {

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
