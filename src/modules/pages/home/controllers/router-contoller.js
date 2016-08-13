import * as Marionette from "marionette";
import HomeView from "../views/home";
import App from "app/app";

let HomeRouterController = Marionette.Object.extend({

    /**
     * Start index route
     *
     * ok. so, this isn't related to the function, but if this function isn't here,
     * marionette 3 will throw an error that the controller doesn't have a declaration of
     * this function.
     *
     * so if anyone has a fix for that, that'd be cool.
     */
    startIndexRoute: function () {}
});

/**
 * Export the controller
 *
 * @exports HomeRouterController
 */
export default HomeRouterController;
