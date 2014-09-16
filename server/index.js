var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    morgan = require('morgan'),
    compress = require('compression'),
    config = require('./config/config'),
    routes = require('./routes/routes'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require('path');

// Logger
app.use(morgan());

// Zip the things
app.use(compress());

// parse application/json
app.use(bodyParser.json())

// parse the cookies
app.use(cookieParser());

// Templating
app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Assets
app.use('/js', express.static(path.join(__dirname, '../build/js')));
app.use('/css', express.static(path.join(__dirname, '../build/css')));

// Routes
app.get('/', routes.app.root);
app.use('/api/updates', routes.api.updates);

var port = config.get('PORT') || 80;

app.listen(port, function () {
    console.log('hello from express on port ' + port);
});
