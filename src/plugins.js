/**
 * Import plugins & setup marionette inspector.
 */
import Backbone from 'backbone';
import $ from 'jquery';
import Marionette from 'backbone.marionette';
Backbone.$ = $;

/**
 * Start Marionette Inspector
 */
if(window.__agent) window.__agent.start(Backbone, Marionette);