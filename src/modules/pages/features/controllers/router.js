import * as Marionette from "marionette";
import FeaturesRouterController from "./router-contoller";
import App from "app/app";

/**
 * Features page Router
 *
 * @module modules/pages/features
 */
let FeaturesRoute = Marionette.AppRouter.extend({

    /**
     * Specify the controller
     *
     * @protected
     */
    controller: new FeaturesRouterController,

    /**
     * Routes
     *
     * @protected
     */
    appRoutes: {
        "features(/)": "startFeaturesRoute"
    },

    /**
     * When the (/) page route is hit, we want to run this
     *
     * @protected
     */
    startFeaturesRoute () {
        System.import("../views/features").then(View => App.getContentContainer().show(new View.default()));
    }

});

/**
 *  Export the router
 *
 * @exports HomeRouter
 */
export default FeaturesRoute;
