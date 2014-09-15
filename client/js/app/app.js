/**x
 * @jsx React.DOM
 */

console.log('hello from appppp');

var React = require('react'),
    _ = require('underscore'),
    Backbone = require('Backbone'),
    MainScreen = require('./components/screens/MainScreen'),
    app = document.getElementById('app');
Backbone.$ = require('jquery');

// hack to get the React chrome extension to work
window.React = React;

var UpdatesCollection = require('./models/updates-collection');

var u = new UpdatesCollection();

u.fetch().success(function () {
    // go!   
    React.renderComponent(<MainScreen updates={u.toJSON()} />, app);
}).fail(function () {
	// log the fail
    console.log(arguments);
});
