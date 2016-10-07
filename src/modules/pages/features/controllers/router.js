import * as Marionette from "marionette";
import {controller, appRoute} from "modules/common/controllers/decorators";
import FeaturesRouterController from "./router-contoller";
import App from "app/app";

/**
 * Features page Router
 *
 * @module modules/pages/features
 */
@controller(new FeaturesRouterController)
class FeaturesRoute extends Marionette.AppRouter {

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
        System.import("../views/features").then(View => App.getContentContainer().show(new View.default()));
    }

}

/**
 *  Export the router
 *
 * @exports HomeRouter
 */
export default FeaturesRoute;
