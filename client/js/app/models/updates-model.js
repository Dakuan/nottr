var Backbone = require('backbone'),
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

module.exports = Backbone.Model.extend({
    parse: function (model) {
    	return _sentimentIcon(model);
    }
});
