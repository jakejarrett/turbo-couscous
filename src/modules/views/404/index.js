import App from "app/app";
import { View } from "backbone.marionette";
import NavigationView from "modules/components/navigation";

/**
 * Home view
 *
 * @module modules/views/404
 * @exports MissingPage
 */
class MissingPage extends View {

    constructor () {
        super();
    }

    template () {
        return _.template(`
            <h1>Oh no! We're unable to find that page!</h1>
        `)();
    }

    /**
     * On render, we want to add the navigation
     *
     * @protected
     */
    onRender () {
        let Navigation =  new NavigationView();
        App.navigationRegion.show(Navigation);
        Navigation.setItemAsActive("home");
    }

}

export default MissingPage;