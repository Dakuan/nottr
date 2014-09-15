/**
 * @jsx React.DOM
 */

var React = require('react'),
	_ = require('underscore');

var MainScreen = React.createClass({displayName: 'MainScreen',

	render: function() {
		return (
			React.DOM.div({className: "app-container"}, 
				React.DOM.div({className: "page-header"}, 
					React.DOM.h1(null, "Nottr (not twitter)")
				), 
				React.DOM.ul({className: "updates"}, 
					_.range(10).map(function() {
						return (
							React.DOM.li({className: "update"}, 
								React.DOM.div({className: "sentiment-container pull-left"}, 
									React.DOM.div({className: "sentiment"}, 
										React.DOM.i({className: "fa fa-meh-o"})
									)
								), 
								React.DOM.div({className: "update-body"}, 
									React.DOM.h4(null, "@lemonzest ", React.DOM.small(null, "12:00")), 
									React.DOM.p(null, "Lemonade works for me")
								)
							)
						);
					})
				)
			)
		);
	}

});

module.exports = MainScreen;