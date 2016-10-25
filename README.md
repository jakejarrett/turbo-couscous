# Turbo Couscous

A Marionette 3.1 & ES7 Starter pack. <sup>(Batteries not included)</sup>

* [Turbo Couscous](#turbo-couscous)
  * [Tech](#tech)
  * [Getting Started](#getting-started)
  * [Usage](#usage)
     * [Importing dependencies](#importing-dependencies)
     * [Classes / Instantiating a new view (Uses decorators)](#classes--instantiating-a-new-view-uses-decorators)
     * [Components](#components)
     * [Eventing](#eventing)
  * [The server](#the-server)
     * [Starting the server](#starting-the-server)
        * [Using cygwin](#using-cygwin)
     * [Building](#building)
        * [Serving production grade product](#serving-production-grade-product)
     * [Server side rendering](#server-side-rendering)


## Tech

* Babel (ES2016 -> ES5)
  * A lot of nice goodies from the latest JS supported on IE/Safari etc.
* Webpack 2 (Supports common module types & ES2016 tree shaking, code chunks)
  * Tree shaking & Code chunks allow us to build the app to be more like a **PWA**.
* Marionette.Component - Web Components API that ties in with Marionette (backbone.radio)
  * Re-usable, Encapsulated components.
* SASS -> CSS -> PostCSS (Which does autoprefixing, minification etc)
  * We only have to write spec compliant CSS in SCSS & PostCSS will help out with the vendor implementations.
* Marionette 3.1.0 (Main difference is, You interface with Marionette.View instead of ItemView/CollectionView/CompositeView)
  * Marionette 3.1 provides a bunch of performance improvements over 3.0
* Web Components
  * Custom Elements [Spec](https://html.spec.whatwg.org/multipage/scripting.html#custom-elements)
  * Shadow Dom (Marionette.Component)
* Bootstrap 4
  * This allows us to utilize a fair amount of modern features in bootstrap without having to write layer ontop of layer for partial improvements around different pages


## Getting Started

You can simply run **./bootstrap** from any **bash** (incl cygwin) terminal to bootstrap your install for you (Will install global dependencies etc). otherwise, Here is the set of commands required.

```shell
# Global Dependencies
gem install sass
npm install -g webpack babel-cli webpack-dev-server yarn

# Local Dependencies
yarn
```

**Why Yarn?**

Yarn allows the installs to be **reproducible** removing any issues with initial installs.


## Usage

Usage is fairly straight forward, It's using ES2015 **classes** syntax, which provides us a with a nicer interface.

### Importing dependencies

We utilize ES2016 syntax for the most part (But support **AMD**, **CJS**, **SystemJS** etc)

```javascript
import App from "app/app"; // Import the app and its singleton interfaces.
import { View } from "marionette"; // Import only marionette's View interface.
import {className, template, on} from "modules/common/controllers/decorators"; // Decorators (@on etc)
```

### Classes / Instantiating a new view (Uses decorators)

This utilizes ES2016 Classes sugar syntax w/ ES2017 **Stage 0** decorators

```javascript
/**
 * Home view
 *
 * @module modules/pages/home
 * @exports HomeView
 */
@className("home") // Same as this.className = "home"
@template(Template) // Same as this.template = function () { return _.template(Template); }
class HomeView extends View {
  	
  	/**
  	 * Constructor
  	 */
    constructor () {
        super(); // Required
    }

    /**
     * Do something on render
     *
     * @protected
     */
    onRender () {
       // Do the stuff you'd do on render.
    }
}

export default HomeView;
```

### Components

Components are inherited from the **Marionette.Component** library

```javascript
import App from "app/app";
import { View } from "marionette";
import DemoComponent from "modules/common/components/demo-component";

class HomeView extends View {
  
  /**
   * Constructor
   */
  constructor () {
    super(); // Required
  }
  
  // Register component at render
  onRender () {
    this.registerComponent("demo-component", DemoComponent, this.$el.find("#container"));
  }
  
  /**
  * Register the component.
  *
  * @param componentName {String} Name the component will be registered under.
  * @param component {HTMLElement} The component you're registering.
  * @param el {jQuery} Container/Element you're putting the component into.
  * @param properties {Object} Properties you wish to apply to the component.
  */
  registerComponent (componentName, component, el, properties) {
    let Component = App.Compontents;
    Component.register(componentName, component, properties);

    let componentObject = Component.getComponent(componentName);

    /** Store references to the component & radio channels **/
    this.components[componentObject.elementName] = componentObject.component;
    this.componentChannels[componentObject.elementName] = componentObject.radioChannel || {};

    el.append(componentObject.component);
  }
}
```

**Making a component** (using Marionette.Component)

```javascript
import Styles from "!css?modules!sass!./style.scss";  // Style, we put this inside the shadow dom.
import Template from "./index.html"; 				  // Template
import { Component, on } from "marionette.component"; // We import the component interface AND the decorator

/**
 * Entry point for demo-component
 */
class DemoComponent extends Component {

  /**
   * Setup our component.
   *
   * @param elementName {String} The name the element will be rendered with (Must be hyphen seperated)
   */
  constructor (elementName) {
    const renderedTemplate = _.template(Template)();
    super(elementName, renderedTemplate, Styles);
    return this.element; // We return the element for the registration method
  }

  /**
   * When the user clicks the element, console log "hello" and the click event.
   *
   * @param event {Event} The click event.
   */
  @on("click")
  onUserClick (event) {
    console.log("hello", event);
  }
}

/**
 * Export the Component
 *
 * @exports DemoComponent
 */
export default DemoComponent;
```

### Eventing

Events **should** be handled via Backbone.Radio, to allows us to design a decoupled event system where our encapsulated components can communicate with the View layer, but are not directly dependent on each other.

## The server
We use express & webpack as the frontend server.

### Starting the server

On your system's default terminal (cygwin isn't supported - see below), run **npm start** and it will start a server with webpack dashboard.

Webpack dashboard is primarily used as it will show you an overview of the built files & dependencies (and **their** dependencies.) and how much percentage of our app those dependencies take up.

#### Using cygwin

Run **node server** and it will build webpack but without the dashboard.



### Building

This will be inside a build.sh file to automate the task, but if you're unable to get it building, the command is-

```shell
webpack --config webpack.production.config.js
```



#### Serving production grade product

<sup>**SSL Certificates Required** - You need to provide your own SSL certificates to run the production server.
If you wish not to run SSL, you can alter the **server.js** file to not use https.</sup>

You can simply run **./production** in the command prompt to run the server as if it were production.

Alternatively, you can run these commands.

```bash
export NODE_ENV=production
export PORT=3009
webpack --config webpack.production.config.js
npm start
```

### Server side rendering

The current implementation of the express server supports server side rendering (This will probably be altered to use express routes instead of the regex nightmare that it is at the moment.)

:scream_cat: