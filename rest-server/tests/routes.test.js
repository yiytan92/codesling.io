import axios from 'axios';

require('dotenv').config();
require('dotenv').load();

const URL = `${process.env.HOST}:${process.env.PORT}`;

test('rest-server should run and return a 404 to {GET /}', async (done) => {
  let resp;
  try {
    resp = await axios.get(URL + '/');
  } catch (e) {
    expect(e.response.status).toBe(404);
  }
  expect(resp).toBe(undefined);
  done();
});

test('rest-server should not accept {POST /run} without a "code" body property', async (done) => {
  let resp;
  try {
    resp = await axios.post(URL + '/run');
  } catch (e) {
    expect(e.response.status).toBe(400);
  }
  expect(resp).toBeUndefined();
  done();
});

test('rest-server should accept {POST /run} with a "code" body property', async (done) => {
  let resp;
  const fixture = 'hello, world!';
  try {
    resp = await axios.post(URL + '/run', { code: `console.log("${fixture}");` });
    expect(resp.data.stdout).toBe(fixture + '\n');
  } catch (e) {
    console.log('Unexpected error in rest-server {POST /run} with code test. e = ', e);
  }
  expect(resp).toBeDefined();
  done();
});
