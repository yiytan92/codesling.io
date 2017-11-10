import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import log from './lib/log';
import router from './database/routes';
import './database';

const app = express();
const port = 4990 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', router);

app.listen(port, () => log(`rest-server listening on port ${port}`));
