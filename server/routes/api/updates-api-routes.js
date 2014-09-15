var express = require('express'),    
    request = require('request'),
    transformStream = require('../../transforms/transform-stream'),
    camelCaseKeys = require('../../transforms/camel-case-keys'),
    updatesRouter = express.Router();

updatesRouter.get('/', function (req, res, next) {
    request.get('http://adaptive-test-api.herokuapp.com/tweets.json')
        .pipe(transformStream(camelCaseKeys))
        .pipe(res);
});

module.exports = updatesRouter;
