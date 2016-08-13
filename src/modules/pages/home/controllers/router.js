import * as Marionette from "marionette";
import HomeRouterController from "./router-contoller";
import HomeView from "../views/home";
import App from "app/app";

/**
 * Home page Router
 *
 * @module modules/pages/home
 */
let HomeRouter = Marionette.AppRouter.extend({

    /**
     * Specify the controller
     *
     * @protected
     */
    controller: new HomeRouterController,

    /**
     * Routes
     *
     * @protected
     */
    appRoutes: {
        "(/)": "startIndexRoute"
    },

    /**
     * When the (/) page route is hit, we want to run this
     *
     * @protected
     */
    startIndexRoute: function () {
        App.getContentContainer().show(new HomeView());
    }

});

/**
 *  Export the router
 *
 * @exports HomeRouter
 */
export default HomeRouter;
