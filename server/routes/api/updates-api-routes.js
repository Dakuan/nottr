var express = require('express'),    
    request = require('request'),
    transformStream = require('../../transforms/transform-stream'),
    camelCaseKeys = require('../../transforms/camel-case-keys'),
    assignSentiment = require('../../transforms/assign-sentiment'),
    updatesRouter = express.Router();

updatesRouter.get('/', function (req, res, next) {
    request.get('http://adaptive-test-api.herokuapp.com/tweets.json')
        .pipe(transformStream(camelCaseKeys))
        .pipe(transformStream(assignSentiment))
        .pipe(res);
});

module.exports = updatesRouter;
