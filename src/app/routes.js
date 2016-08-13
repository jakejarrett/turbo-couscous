import * as Marionette from "backbone.marionette";
import HomeRoute from "../modules/pages/home/controllers/router";

let LocalRouter = Marionette.AppRouter.extend({});

/** Invoke the new router **/
let Router = new LocalRouter();

/**
 * Routes
 */
let RouteRegistration = [
    new HomeRoute()
];

/**
 * Register the routes
 */
RouteRegistration.forEach(function(aRouteController){
    Router.processAppRoutes(aRouteController, aRouteController.appRoutes);
});

/**
 * Export the router
 *
 * @exports Router
 */
export default Router;
