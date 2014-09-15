module.exports = {
    app: {
        root: function (req, res) {
            res.render('index');
        }
    },
    api: {
    	updates: require('./api/updates-api-routes')
    }
};
