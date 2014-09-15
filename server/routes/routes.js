var React = require('react'),
    updatesData = require('../data/updates-data'),
    _ = require('underscore'),
    UpdatesCollection = require('../../build/server/app/models/updates-collection'),
    UpdatesModel = require('../../build/server/app/models/updates-model'),
    componentLoader = require('../utils/component-loader');

module.exports = {
    app: {
        root: function (req, res) {
            var updates = updatesData.get(),
                u = '';
            updates.on('data', function (data) {
                u += data;
            });

            updates.on('finish', function () {
                var parsed = _(JSON.parse(u)).map(function (element) {
                    var m = new UpdatesModel(),
                        mm = m.parse(element);
                    return mm;
                });
                var updates = new UpdatesCollection(parsed),
                    component = componentLoader('screens/MainScreen');
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
