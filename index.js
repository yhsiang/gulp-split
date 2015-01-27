'use strict';

var gutil = require('gulp-util');
var through = require('through2');

module.exports = splitPlugin;

function splitPlugin(options) {

    return through.obj(objectStream);

    function objectStream(file, enc, cb) {
        /* jshint validthis: true */

        var _this = this;

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            _this.emit('error', pluginError('Streaming not supported'));
            return cb();
        }

        try {
            var contents = file.contents.toString();
            file.contents = new Buffer(splitIt(contents, options));
        } catch (err) {
            err.fileName = file.path;
            _this.emit('error', pluginError(err));
        }

        _this.push(file);

        cb();
    }
}

function pluginError(msg) {
    return new gutil.PluginError('gulp-split', msg);
}

function splitIt(content, options) {
    if (!content) { return ''; }

    var output = content.toString(),
        splittedString = output.split(options.regex);

    if(typeof splittedString[options.index] === 'string') {
        output = splittedString[options.index].trim();
    }

    return output;
}