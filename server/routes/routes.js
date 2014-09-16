var React = require('react'),
    updatesData = require('../data/updates-data'),
    _ = require('underscore'),
    UpdatesCollection = require('../../build/server/app/models/updates-collection'),
    UpdatesModel = require('../../build/server/app/models/updates-model'),
    componentLoader = require('../utils/component-loader');

module.exports = {
    app: {
        root: function (req, res) {

            var sort = req.cookies['adpSortCookie0'];
            if (!sort) {
                sort = 'updatedAt'
            }
            res.cookie = sort;

            updatesData.getPromise().then(function (updatesJSON) {
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
                    blob: updatesJSON
                });
            });
        }
    },
    api: {
        updates: require('./api/updates-api-routes')
    }
};
