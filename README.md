# Turbo Couscous :scream_cat:
An opinionated [MarionetteJS 3](http://http://marionettejs.com/) Boilerplate.

### Requirements
- NodeJS
    - v4+ (Use nvm)

### Tech
- ES6 (Babel)
- Webpack
- SASS
- PostCSS
- Marionette & Backbone
- Underscore

### Setup
```
    git clone https://github.com/jakejarrett/turbo-couscous.git
    
    # This will "Bootstrap" your initial install, EG/ Any global dependencies that may be required.
    ./bootstrap
    
    npm start
    
    open http://localhost:3000
```

### Structure
- **public/**
    - index.html
- **server/**
    - Webpack dev server config
- **src/**
    - Application files JS(es6), HTML, SASS
    - **/app/**
    - Global files (App, Route Registration etc)
    - **/modules/**
        - Pluggable children, Eg/ a view or a modal.
        - **/common**
            - Commonly shared items (EG/ Controller for many views)
        - **/pages**
            - Pages
            - **/controllers**
                - Controllers for this page
            - **/views**
                - Views for the page (page.js page.html page.scss)
    - **main.js**
        - Entry script & App initialization
    - **plugins.js**
        - Setup Backbone & Marionette and hook Browser Inspectors if present
- **server.js**
    - Express server configuration
- **webpack.config.js**
    - Webpack configuration (development)
- **webpack.production.config.js**
    - Webpack configuration (production)

:cat2: 