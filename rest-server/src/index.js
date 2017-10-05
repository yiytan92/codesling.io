import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';

import log from './lib/log';

const app = express();
const port = 4990 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.post('/run', async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.json({
      success: false,
      message: 'code property on req.body is required',
    });
  }

  try {
    const resp = await axios.post(`${process.env.CODERUNNER_SERVICE_URL}/submit-code`, {
      code,
    });
    const stdout = resp.data;
    return res.json({
      success: true,
      stdout,
    });
  } catch (e) {
    log('error posting to coderunner service. e = ', e);
    return res.status(400).json({
      success: false,
      message: 'error running your code.',
    });
  }
});

app.listen(port, () => log(`rest-server listening on port ${port}`));
