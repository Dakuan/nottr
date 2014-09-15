var express = require('express'),
    request = require('request'),
    updatesData = require('../../data/updates-data'),
    updatesRouter = express.Router();

updatesRouter.get('/', function (req, res, next) {
    updatesData.get().pipe(res);
});

module.exports = updatesRouter;
