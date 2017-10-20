import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
dotenv.load();

const URL = `${process.env.HOST}:${process.env.PORT}`;

// tuples of [expression, stdout] to test
const fixtures = [
  ["console.log(2)", "2"],
  ["var x = 'hello world'; console.log(x);", "hello world"]
];

test('Should respond to a {POST /submit-code}', async (done) => {
  let resp;
  try {
    resp = await axios.post(`${URL}/submit-code`, {
      code: "// comment",
    });
  } catch (e) {
    console.log('Unexpected error in coderunner-service {POST /submit-code}. e = ', e);
  }
  expect(resp).toBeDefined();
  done();
});

test('Should evaluate code correctly and send back stdout', async () => {
  const asyncTestAgainstFixture = async (tuple) => {
    const [ expression, stdout ] = tuple;
    let resp;
    try {
      resp = await axios.post(`${URL}/submit-code`, {
        code: expression,
      });
      expect(resp.data).toBe(stdout + '\n');
      expect(true).toBe(true);
    } catch (e) {
      console.log(`Unexpected error in coderunner-service {POST /submit-code}.
        expected expression = ${expression}
        resp.data = ${resp.data}
        e = ${e}`
      );
    }
  };
  expect.assertions(fixtures.length * 2);
  await Promise.all(fixtures.map(asyncTestAgainstFixture));
});
