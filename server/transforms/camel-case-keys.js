var changeCase = require('change-case'),
    _ = require('underscore');

// This function takes an object and (shallowly) camelCases all it's keys.
// Ruby uses sname_case wherease camelCase is conventional in javascript land.
// Personally, I would argue that if a webservice is returning JSON, it should
// be using JSON convetions, which include camelCase.
// Still, we don't always get that luxury, and it's not a big deal converting them.
module.exports = function (obj) {
    // keep it immutable to avoid bizzaro side effects
    return _.chain(obj)
        .keys()
        .reduce(function (memo, oldKey) {
            memo[changeCase.camelCase(oldKey)] = obj[oldKey];
            return memo;
        }, {})
        .value();
};
