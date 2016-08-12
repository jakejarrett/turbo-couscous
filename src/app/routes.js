/**
 * Route registration
 */
import * as Mn from "backbone.marionette";
import HomeRoute from "../modules/pages/home/controllers/router";

let LocalRouter = Mn.AppRouter.extend({});

let Router = new LocalRouter();

/**
 * Routes
 */
let RouteRegistration = [
    new HomeRoute()
];

RouteRegistration.forEach(function(aRouteController){
    Router.processAppRoutes(aRouteController, aRouteController.appRoutes);
});

/**
 * Export the router
 *
 * @exports Router
 */
export default Router;