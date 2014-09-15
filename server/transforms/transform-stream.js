var stream = require('stream'),
    _ = require('underscore'),
    Transform = stream.Transform;
module.exports = function (transform) {
    var parser = new Transform();
    var res = '';
    parser._transform = function (data, encoding, done) {
        res += data;
        done();
    };
    parser._flush = function (done) {
        var d = JSON.parse(res.toString()),
            transformed = _(d).map(transform);
        this.push(JSON.stringify(transformed));
        res = '';
        done();
    }
    parser.setEncoding('utf8');
    return parser;
}
