/**x
 * @jsx React.DOM
 */

console.log('hello from appppp');

var React = require('react'),
    _ = require('underscore'),
    Backbone = require('Backbone'),
    UpdatesModel = require('./models/updates-model'),
    UpdatesCollection = require('./models/updates-collection'),
    MainScreen = require('./components/screens/MainScreen'),
    app = document.getElementById('app');

Backbone.$ = require('jquery');

// hack to get the React chrome extension to work
window.React = React;

var UpdatesCollection = require('./models/updates-collection');

var u = new UpdatesCollection();
// go!  
if(window._xoBlob) {
	// we have rendered something on the server
  	var parsed = _(_xoBlob).map(function (element) {
        var m = new UpdatesModel(),
            mm = m.parse(element);
        return mm;
    });
    u.set(parsed);
    window._xoBlob = false;
    React.renderComponent(<MainScreen updates={u.toJSON()} />, app);
} else {
	u.fetch().success(function () {	     
	    React.renderComponent(<MainScreen updates={u.toJSON()} />, app);
	}).fail(function () {
		// log the fail
	    console.log(arguments);
	});
}

