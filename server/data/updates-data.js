var request = require('request'),
    transformStream = require('../transforms/transform-stream'),
    camelCaseKeys = require('../transforms/camel-case-keys'),
    assignSentiment = require('../transforms/assign-sentiment');

module.exports = {
    get: function () {
        return request.get('http://adaptive-test-api.herokuapp.com/tweets.json')
            .pipe(transformStream(camelCaseKeys))
            .pipe(transformStream(assignSentiment));
    }
}
