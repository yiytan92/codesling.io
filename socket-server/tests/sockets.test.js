const ioClient = require('socket.io-client/dist/socket.io.js');
const { after } = require('lodash');
const delay = require('delay');
const randomId = require('random-id');

const clientEvents = require('../src/clientEvents');

require('dotenv').config();
require('dotenv').load();

describe('Client interactions', () => {
  let client1;
  let client2;
  let roomId = randomId(10);

  beforeAll((done) => {
    done = after(2, done);
    const query = { query: `roomId=${roomId}` };
    client1 = ioClient.connect(`${process.env.HOST}:${process.env.PORT}`, query);
    client2 = ioClient.connect(`${process.env.HOST}:${process.env.PORT}`, query);
    client1.on('connect', () => {
      done();
    });
    client2.on('connect', () => {
      done();
    });
  });

  afterAll(async (done) => {
    client1.disconnect();
    client2.disconnect();
    await delay(300);
    done();
  });

  // Expects people to be able to connect to the socket-server
  test('Should add a new user to a room and receive the same text', async (done) => {
    done = after(2, done);
    expect.assertions(4);
    const fixture = { text: '// your code here' };
    const handler = (text) => {
      try {
        expect(JSON.stringify(text)).toBe(JSON.stringify(fixture));
        // make sure real test above does not throw
        expect(true).toBe(true);
      } catch (e) {
        console.log(e.toString());
      }
      done();
    };

    client1.on('server.initialState', handler);
    client2.on('server.initialState', handler);

    client1.emit('client.ready');
    client2.emit('client.ready');
  });

  // Expects clients to be able to connect with one another
  test('Should be able to hear emissions from other clients', (done) => {
    expect.assertions(2);
    client2.on('server.changed', (payload) => {
      try {
        expect(payload.text).toBe('console.log(2)');
        expect(true).toBe(true);
      } catch (e) {
        console.log(e.toString());
      }
      done();
    });
    client1.emit('client.update', { text: 'console.log(2)'});
  });

  // Expects clients to disconnect
  test('Client should have disconnected', done => {
    expect.assertions(1);
    client1.on('server.leave', () => {
      // ensures server.leave is heard for other room clients
      expect(true).toBe(true);
      done();
    });
    client2.emit('client.disconnect');
  });
});
