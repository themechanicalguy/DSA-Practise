var fs = require('fs');
var filename = '';
var i = 0;
var lines = [];

// modeled on http://st-on-it.blogspot.com/2011/05/how-to-read-user-input-with-nodejs.html
var query = function (text, callback) {
  process.stdin.resume();
  process.stdout.write('Please clarify what was meant by: ' + text);
  process.stdin.once('data', function (data) {
    callback(data.toString().trim());
  });
};

if (process.argv.length > 2) {
  filename = process.argv[2];
  fs.readFile(filename, 'ascii', function (err, data) {
    if (err) {
      console.error('' + err);
      process.exit(1);
    }
    lines = data.split('\n');
    for (i = 0; i < lines.length; i++) {
      if (/\?$/.test(lines[i])) {
        // ask user for clarification
        query(lines[i], function (response) {
          console.log(response);
          process.stdin.pause();
        });
      } else {
        console.log(lines[i]);
      }
    }
  });
} else {
  console.error('File name must be supplied on command line.');
  process.exit(1);
}
