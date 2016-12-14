'use strict';

var through = require('through2');

module.exports = function () {
  function transform (file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if ([/>>>/, /<<</, /===/].some((regex) => regex.test(file))) {
      console.log('These files might have some sketchy git stuff going on, ' +
        'please remove leftover merge conflict syntax!\n\n')
      console.log(file.path);
    }
    callback();
  }
  return through.obj(transform);
}