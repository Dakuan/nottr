var request = require('request'),
    transformStream = require('../transforms/transform-stream'),
    camelCaseKeys = require('../transforms/camel-case-keys'),
    assignSentiment = require('../transforms/assign-sentiment'),
    Q = require('q');

module.exports = {
    get: function () {
        return request.get('http://adaptive-test-api.herokuapp.com/tweets.json')
            .pipe(transformStream(camelCaseKeys))
            .pipe(transformStream(assignSentiment));
    },
    getPromise: function () {
        var deferred = Q.defer();
            updates = this.get(),
            u = '';
        updates.on('data', function (data) {
            u += data;
        });
        updates.on('finish', function () {
            deferred.resolve(JSON.parse(u));
            u = '';
        });

        return deferred.promise;
    }
}
