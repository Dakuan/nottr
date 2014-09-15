/**x
 * @jsx React.DOM
 */

console.log('hello from app');

var React = require('react'),
	_ = require('underscore'),
    MainScreen = require('./components/screens/MainScreen'),
    app = document.getElementById('app');

// hack to get the React chrome extension to work
window.React = React;

var updates = _(_.range(10)).map(function (index) {
    return {
    	id: index,
        userHandle: '@lemonzestt',
        message: 'Lemonade works for mee'
    }
});

// go!
React.renderComponent(<MainScreen updates={updates} />, app);
