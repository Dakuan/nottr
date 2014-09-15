var changeCase = require('change-case'),
    _ = require('underscore');
    
module.exports = function (obj) {
    // keep it immutable to avoid bizzaro side effects
    var ret = {},
        oldKeys = _.chain(obj)
            .keys()
            .each(function (oldKey) {
                var newKey = changeCase.camelCase(oldKey);
                ret[newKey] = obj[oldKey];
            });

    return ret;
};
