import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
dotenv.load();

const URL = `${process.env.HOST}:${process.env.PORT}`;

test('rest-server should respond with a 200 to {GET /api/new-sling}', async () => {
  let resp = {};
  try {
    resp = await axios.get(URL + '/api/new-sling');
  } catch (e) {
    console.log('Unexpected error for {GET /api/new-sling}. e = ', e);
  }
  expect(resp.status).toMatchSnapshot();
});
