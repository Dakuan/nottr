var Backbone = require('backbone'),
    moment = require('moment'),
    sentiment = require('../../../../constants/sentiment');

function _sentimentIcon(model) {
    switch (model.sentiment) {
    case sentiment.POSITIVE:
        model.sentimentIcon = 'fa-smile-o'
        break;
    case sentiment.NEGATIVE:
        model.sentimentIcon = 'fa-frown-o'
        break;
    default:
        model.sentimentIcon = 'fa-meh-o'
        break;
    }
    return model;
}

function _momentify(model) {
    model.updatedAt = moment(model.updatedAt);
}

module.exports = Backbone.Model.extend({

    parse: function (model) {
        _momentify(model);
        return _sentimentIcon(model);
    }
});
