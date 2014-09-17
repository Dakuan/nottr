var React = require('react'),
    updatesData = require('../data/updates-data'),
    _ = require('underscore'),
    hasErrors = require('../../util/has-errors'),
    UpdatesCollection = require('../../build/server/app/models/updates-collection'),
    UpdatesModel = require('../../build/server/app/models/updates-model'),
    componentLoader = require('../utils/component-loader');

module.exports = {
    app: {
        root: function (req, res, next) {

            var sort = req.cookies['adpSortCookie0'];
            if (!sort) {
                sort = 'updatedAt'
            }
            res.cookie = sort;

            updatesData.getPromise().then(function (updatesJSON) {

                if (updatesJSON.length === 1) {
                    // might be an error
                    var error = hasErrors(updatesJSON[0]);
                    if (error) {
                        return next(new Error(error));
                    }
                }

                var updates = new UpdatesCollection(updatesJSON, {
                    sort: sort,
                    parse: true
                }),
                    component = componentLoader('screens/MainScreen'),
                    html = React.renderComponentToString(component({
                        updates: updates.toJSON()
                    }));
                res.render('index', {
                    app: html,
                    blob: JSON.stringify(updatesJSON)
                });
            });
        }
    },
    api: {
        updates: require('./api/updates-api-routes')
    }
};
