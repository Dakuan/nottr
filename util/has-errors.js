var hasKeys = require('./has-keys');

module.exports = function (obj) {
    if (!hasKeys(obj, ['updatedAt', 'message', 'sentiment', 'userHandle'])) {
        return obj.message || 'unknown error'
    }
    return false
}
