var Backbone = require('backbone'),
    moment = require('moment');

Backbone.$ = require('jquery');

function _compareDate(model) {
    var m = moment(model.get('updatedAt'));
    return -m.toDate();
}

module.exports = Backbone.Collection.extend({
    initialize: function (models, options) {
        this._setComparator(options.sort);
    },
    url: '/api/updates',
    model: require('./updates-model'),
    changeSort: function (sortBy) {
    	this._setComparator(sortBy);
        this.sort();
    },
    _setComparator: function (sortBy) {
        if (sortBy === 'sentiment') {
            this.comparator = 'sentiment'
        } else {
            this.comparator = _compareDate;
        }
    }
});
