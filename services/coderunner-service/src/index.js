import { writeFile, chown } from 'fs';
import { execFile } from 'child_process';
import express from 'express';
import bodyParser from 'body-parser';
import tmp from 'tmp';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

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
            res.write(JSON.stringify(stdout));  
            res.send();
          }
        });
      }
    });
  });
});

app.listen(PORT, console.log(`coderunner-service is listening on port ${PORT}`));
