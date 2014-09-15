var stream = require('stream'),
    _ = require('underscore'),
    Transform = stream.Transform;
module.exports = function (transform) {
    var parser = new Transform();
    parser._transform = function (data, encoding, done) {
        var d = JSON.parse(data.toString()),
            transformed = _(d).map(transform);
        data.write(JSON.stringify(transformed));
        this.push(data);
        done();
    };
    parser.setEncoding('utf8');
    return parser;
}
