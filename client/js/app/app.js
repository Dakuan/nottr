/**x
 * @jsx React.DOM
 */

var React = require('react'),
    _ = require('underscore'),
    Backbone = require('Backbone'),
    EventBus = Backbone.Events,
    UpdatesModel = require('./models/updates-model'),
    UpdatesCollection = require('./models/updates-collection'),
    MainScreen = require('./components/screens/MainScreen'),
    sortCookie = require('./cookies/sort-cookie'),    
    UpdatesCollection = require('./models/updates-collection'),
    app = document.getElementById('app');

// jQuery everywhere
var jQ = require('jquery');
window.jQuery = jQ;
window.$ = jQ;
Backbone.$ = jQ;

// have to do this now as jQuery and browserifty don't play nicely
var modal = require('../../../node_modules/bootstrap/js/modal');

// hack to get the React chrome extension to work
window.React = React;

// create our collection of updates
var u = new UpdatesCollection([], {
	sort: sortCookie.get()
});

// when we sort we'll want to re-render (or not as the case may be, but React takes care of that)
u.on('sort', function() {
	_renderMain(u.toJSON());
});

// render the main screen
// it looks a bit mad re-rendering the whole thing any time anything happens
// but this is just part of how React works. Only the bits that change get re-rendered.
function _renderMain(updates) {
	// load more updates, shove them in the collection
	// show a message if none are new
	function _loadMore() {
		var before = u.length;		
		u.fetch({remove: false}).success(function () {
			var noNew = before === u.length;
			_renderMain(u.toJSON());
			if(noNew) {
				window.$('.modal').modal('show');
			}
		});
	}
	React.renderComponent(<MainScreen updates={updates} onClick={_loadMore} sortMethod={sortCookie.get()} />, app);
}

// go!  
if(window._xoBlob) {
	// we have rendered something on the server
    u.set(window._xoBlob, {
    	parse: true
    });
    window._xoBlob = false;
    // this will mount the react component, but will not cause a DOM interaction as the 
    // virtual DOM will match the real one
    _renderMain(u.toJSON());
} else {
	u.fetch().success(function () {	     
		_renderMain(u.toJSON());
	});
}

// okay, this is why we have Flux,
// still it does the job for this demo
EventBus.on('changeSort', function (sort) {
	sortCookie.set(sort);
	u.changeSort(sort);
});


