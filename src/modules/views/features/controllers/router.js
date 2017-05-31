import Marionette, { AppRouter } from "marionette";
import {controller, appRoute} from "marionette-decorators";
import FeaturesRouterController from "./router-controller";
import App from "app/app";

/**
 * Features page Router
 *
 * @module modules/pages/features
 */
@controller(new FeaturesRouterController)
class FeaturesRoute extends AppRouter {

    constructor (...args) {
        super(args);
    }

    /**
     * When the (/) page route is hit, we want to run this
     *
     * @protected
     */
    @appRoute("features(/)")
    startFeaturesRoute () {
        System.import("../views/features").then(View => App.contentRegion.show(new View.default()));
    }

}

/**
 *  Export the router
 *
 * @exports HomeRouter
 */
export default FeaturesRoute;
