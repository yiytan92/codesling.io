const { writeFile, chown } = require('fs');
const { execFile } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const tmp = require('tmp');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/submit-code', (req, res) => {
  tmp.file({ postfix: '.js' }, function _tempFileCreated(err, path, fd) {
    console.log('Path is', path);
    writeFile(path, req.body.code, err => {
      if (err) {
        res.send(err);
      } else {
        execFile('node', [path], (err, stdout, stderr) => {
          if (err) {
            stderr = stderr.split('\n');
            stderr.shift();
            res.send(stderr.join('\n'));
          } else {
            res.write(stdout);
            res.send();
          }
        });
      }
    });
  });
});

app.listen(4000);
