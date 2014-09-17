var _ = require('underscore');

module.exports = function (obj, keys) {
    var res = _(keys).reduce(function (memo, key) {
    	if (!_.has(obj, key)) {
    		memo = false;
    	}
    	return memo;
    }, true);
    return res;
};
