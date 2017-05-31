import App from "../app/app";
import Backbone from "backbone";
import raf from "raf";

const loadUrl = Backbone.History.prototype.loadUrl;

class TurboHistory {

    /**
     * Override default functionality to add in a 404 provider.
     *
     * @param fragment {string} The URL fragment
     */
    static loadUrl (fragment) {
        const loaded = loadUrl.apply(this, arguments);

        if (!loaded) {
            System.import("../modules/views/404").then(View => {
                const view = new View.default();
                raf(_ => App.contentRegion.show(view));
            });
        }
    }
}

Backbone.History.prototype.loadUrl = TurboHistory.loadUrl;

export default TurboHistory;