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
    app = document.getElementById('app');

Backbone.$ = require('jquery');

// hack to get the React chrome extension to work
window.React = React;

var UpdatesCollection = require('./models/updates-collection');

var u = new UpdatesCollection([], {
	sort: sortCookie.get()
});

u.on('sort', function() {
	_renderMain(u.toJSON());
});

function _loadMore() {
	var before = u.length;
	u.fetch({remove: false}).success(function () {
		var noNew = before === u.length;
		_renderMain(u.toJSON());
		if(noNew) {
			Backbone.$('.modal').modal('show');
		}
	});
}

function _renderMain(updates) {
	React.renderComponent(<MainScreen updates={updates} onClick={_loadMore} sortMethod={sortCookie.get()} />, app);
}

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
    _renderMain(u.toJSON());
} else {
	u.fetch().success(function () {	     
		_renderMain(u.toJSON());
	});
}

EventBus.on('changeSort', function (sort) {
	sortCookie.set(sort);
	u.changeSort(sort);
});


