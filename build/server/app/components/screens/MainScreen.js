/**
 * @jsx React.DOM
 */

var React = require('react');

var MainScreen = React.createClass({displayName: 'MainScreen',

	render: function() {
		return (
			React.DOM.div(null, 
			"hello from react!"
			)
		);
	}

});

module.exports = MainScreen;