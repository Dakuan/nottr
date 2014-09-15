var sentiment = require('../../constants/sentiment'),
    _ = require('underscore');
module.exports = function (obj) {
    var n = Number(obj.sentiment),
        ret = _.clone(obj);
    console.log(n);
    if (n < 0) {
        ret.sentiment = sentiment.NEGATIVE;
    } else if (n > 0) {
        ret.sentiment = sentiment.POSITIVE;
    } else {
        // todo: tolerance for neutrality
        ret.sentiment = sentiment.NEUTRAL;
    }
    return ret;
};
