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
        if (typeof require.ensure == "function") {
            /* Asynchronous loading of a component that is inside of require.ensure */
            require.ensure([], (require) => {
                var FeaturesView = require("../views/features");
                App.getContentContainer().show(new FeaturesView.default());
            });
        } else {
            /* Server side synchronous loading */
            var FeaturesView = require("../views/features");
            App.getContentContainer().show(new FeaturesView.default());
        }
    }

});

/**
 *  Export the router
 *
 * @exports HomeRouter
 */
export default FeaturesRoute;
