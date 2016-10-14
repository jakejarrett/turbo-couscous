import * as Marionette from "marionette";
import {controller, appRoute} from "modules/common/controllers/decorators";
import HomeRouterController from "./router-contoller";
import App from "app/app";

/**
 * Home page Router
 *
 * @module modules/pages/home
 */
@controller(new HomeRouterController)
class HomeRouter extends Marionette.AppRouter {

    constructor (...args) {
        super(args);
    }

    initialize () {
        var that = this;

        if(module.hot) {
            module.hot.accept("../views/home", () => {
                System.import("../views/home").then(View => App.getContentContainer().show(new View.default()));
            });
        }
    }

    /**
     * When the (/) page route is hit, we want to run this
     *
     * @protected
     */
    @appRoute("(/)")
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
