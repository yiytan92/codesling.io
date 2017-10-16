const ioClient = require('socket.io-client/dist/socket.io.js');
const { after } = require('lodash');

const clientEvents = require('../src/clientEvents');

require('dotenv').config();
require('dotenv').load();

describe('Client interactions', () => {
  const client1 = ioClient.connect(process.env.TEST_SOCKET_SERVER_PORT);
  const client2 = ioClient.connect(process.env.TEST_SOCKET_SERVER_PORT);
  beforeAll(done => {
    done = after(2, done);
    client1.on('connect', () => {
      done();
    });
    client2.on('connect', () => {
      done();
    });
  });
  afterAll(async (done) => {
    await client1.disconnect();
    await client2.disconnect();
    done();
  });

  // Expects people to be able to connect to the socket-server
  test('Should add a new user to a room and receive the same text', done => {
    done = after(2, done);
    expect.assertions(2);
    const obj = { text: '// your code here' };
    client1.on('server.initialState', text => {
      expect(JSON.stringify(text)).toBe(JSON.stringify(obj));
      done();
    });
    client2.on('server.initialState', text => {
      expect(JSON.stringify(text)).toBe(JSON.stringify(obj));
      done();
    });
    client1.emit('client.ready');
    client2.emit('client.ready');
  });

  // Expects clients to be able to connect with one another
  test('Should be able to hear emissions from other clients', done => {
    expect.assertions(1);
    client2.on('server.changed', payload => {
      expect(payload.text).toBe('console.log(2)');
      done();
    });
    client1.emit('client.update', { text: 'console.log(2)'});
  });

  // Expects clients to disconnect
  test('Client should have disconnected', done => {
    expect.assertions(1);
    client1.on('server.leave', () => {
      expect(1).toBe(1);
      done();
    });
    client1.emit('client.disconnect')
  });
});
