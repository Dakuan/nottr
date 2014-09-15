var Backbone = require('backbone'),
    moment = require('moment');

Backbone.$ = require('jquery');

module.exports = Backbone.Collection.extend({
    url: '/api/updates',
    model: require('./updates-model'),
    comparator: function (model) {
    	var m = moment(model.get('updatedAt'));
    	return -m.toDate();
    }
    // comparator: 'sentiment'
});
