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

            var updates = updatesData.get(),
                u = '';
            updates.on('data', function (data) {
                u += data;
            });

            updates.on('finish', function () {
                var updates = new UpdatesCollection(JSON.parse(u), {
                    sort: sort,
                    parse: true
                }),
                    component = componentLoader('screens/MainScreen'),
                    html = React.renderComponentToString(component({
                        updates: updates.toJSON()
                    }));
                res.render('index', {
                    app: html,
                    blob: u
                });
            });
        }
    },
    api: {
        updates: require('./api/updates-api-routes')
    }
};
