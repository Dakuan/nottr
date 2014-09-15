var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    parse: function (model) {
        return model;
    }
});
