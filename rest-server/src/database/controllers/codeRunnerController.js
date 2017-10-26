import axios from 'axios';
import log from '../../lib/log';

export const codeRunner = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({
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
};
