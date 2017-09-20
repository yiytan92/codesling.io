const { writeFile } = require('fs');
const { execFile } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const tmp = require('tmp');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
  tmp.file({ postfix: '.js' }, function _tempFileCreated(err, path, fd) {
    console.log('Path is', path);
    writeFile(path, req.body.code, err => {
      if (err) {
        console.error(err);
      } else {
        execFile('node', [path], (err, stdout, stderr) => {
          if (err) {
            console.error(err);
          }
          res.write(stdout);
          res.send();
        });
      }
    });
  });
});

app.listen(4000);
