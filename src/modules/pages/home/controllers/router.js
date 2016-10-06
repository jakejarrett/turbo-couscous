import * as Marionette from "marionette";
import HomeRouterController from "./router-contoller";
import App from "app/app";

/**
 * Home page Router
 *
 * @module modules/pages/home
 */
class HomeRouter extends Marionette.AppRouter {

    constructor (...args) {
        super(args);
        this.controller = new HomeRouterController;
        this.appRoutes = {
            "(/)": "startIndexRoute"
        };
    }

    /**
     * When the (/) page route is hit, we want to run this
     *
     * @protected
     */
    startIndexRoute () {
        System.import("../views/home").then(View => App.getContentContainer().show(new View.default()));
    }

}

/**
 *  Export the router
 *
 * @exports HomeRouter
 */
export default HomeRouter;
