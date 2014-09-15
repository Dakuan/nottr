var Backbone = require('backbone');

Backbone.$ = require('jquery');

module.exports = Backbone.Collection.extend({
    url: '/api/updates',
    model: require('./updates-model')
});
