import * as Marionette from "backbone.marionette";
import HomeRoute from "../modules/pages/home/controllers/router";
import FeaturesRoute from "../modules/pages/features/controllers/router";

let LocalRouter = Marionette.AppRouter.extend({});

/** Invoke the new router **/
let Router = new LocalRouter();

/**
 * Routes
 */
let RouteRegistration = [
    new HomeRoute(),
    new FeaturesRoute()
];

/**
 * Register the routes
 */
RouteRegistration.forEach((aRouteController) => Router.processAppRoutes(aRouteController, aRouteController.appRoutes));

/**
 * Export the router
 *
 * @exports Router
 */
export default Router;
