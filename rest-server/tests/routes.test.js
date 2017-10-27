import axios from 'axios';

require('dotenv').config();
require('dotenv').load();

const URL = `${process.env.HOST}:${process.env.PORT}`;

test('rest-server should run and return a 404 to {GET /}', async (done) => {
  let resp = {};
  try {
    resp = await axios.get(URL + '/');
  } catch (e) {
    expect(e.response.status).toBe(404);
  }
  expect(resp).toMatchSnapshot();
  done();
});

test('rest-server should not accept {POST /api/run} without a "code" body property', async (done) => {
  let resp = {};
  try {
    resp = await axios.post(URL + '/api/run');
  } catch (e) {
    expect(e.response.status).toBe(400);
  }
  expect(resp).toMatchSnapshot();
  done();
});

test('rest-server should accept {POST /api/run} with a "code" body property', async (done) => {
  let resp = {};
  try {
    resp = await axios.post(URL + '/api/run', { code: `console.log("hello, world!");` });
  } catch (e) {
    console.log('Unexpected error in rest-server {POST /run} with code test. e = ', e);
  }
  expect(resp.data).toMatchSnapshot();
  done();
});
