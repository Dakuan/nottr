var nconf = require('nconf'),
    path = require('path');

var path = path.join(__dirname, './', process.env.NODE_ENV + '.json');
nconf.argv()
    .env()
    .file({
        file: path
    });

module.exports = nconf;
