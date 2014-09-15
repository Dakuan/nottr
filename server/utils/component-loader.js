var path = require('path'),
    componentsPath = '../../build/server/app/components/';

module.exports = function (component) {
    var p = path.join(__dirname, componentsPath, component + '.js');
    return require(p);
};