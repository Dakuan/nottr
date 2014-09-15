var express = require('express'),
    _ = require('underscore'),
    request = require('request'),
    updatesRouter = express.Router();

updatesRouter.get('/', function (req, res, next) {
    request.get('http://adaptive-test-api.herokuapp.com/tweets.json').pipe(res);
});

module.exports = updatesRouter;
