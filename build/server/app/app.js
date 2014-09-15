/**x
 * @jsx React.DOM
 */

console.log('hello from app');

var React = require('react'),
    MainScreen = require('./components/screens/MainScreen'),
    app = document.getElementById('app');

// hack to get the React chrome extension to work
window.React = React;

// go!
React.renderComponent(<MainScreen />, app);  
