var express = require('express'),
    request = require('request'),
    hasErrors = require('../../../util/has-errors'),
    updatesData = require('../../data/updates-data'),
    updatesRouter = express.Router();

updatesRouter.get('/', function (req, res, next) {
    updatesData.getPromise().then(function (updatesJSON) {
        if (updatesJSON.length === 1) {
            // might be an error
            var error = hasErrors(updatesJSON[0]);
            if (error) {
                return next(new Error(error));
            }
        }
        res.status(200).json(updatesJSON);
    });
});

module.exports = updatesRouter;
