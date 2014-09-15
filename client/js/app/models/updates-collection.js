var Backbone = require('backbone'),
    moment = require('moment');

Backbone.$ = require('jquery');

module.exports = Backbone.Collection.extend({
    url: '/api/updates',
    model: require('./updates-model'),
    comparator: 'sentiment'
});
