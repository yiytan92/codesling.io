const ioClient = require('socket.io-client/dist/socket.io.js');

const clientEvents = require('../src/clientEvents');

require('dotenv').config();
require('dotenv').load();

describe('All events should be functions', () => {
  // Expects all clientEvents to be functions
  test('client.ready should be a function', () => {
    expect(typeof clientEvents.default['client.ready']).toBe('function');
  });
  
  test('client.update should be a function', () => {
    expect(typeof clientEvents.default['client.update']).toBe('function');
  });
  
  test('client.disconnect should be a function', () => {
    expect(typeof clientEvents.default['client.disconnect']).toBe('function');
  });
})

describe('Client interactions', () => {
  const client1 = ioClient.connect(process.env.TEST_SOCKET_SERVER_PORT);
  const client2 = ioClient.connect(process.env.TEST_SOCKET_SERVER_PORT);
  // beforeEach(() => {
  beforeAll(() => {
    client1.on('connect', () => {
      client1.emit('client.ready');
    });
    client2.on('connect', () => {
      client2.emit('client.ready');
    });
  });
  // afterEach(() => {
  afterAll(() => {
    client1.disconnect();
    client2.disconnect();
  });
  // Expects people to be able to connect to the socket-server
  test('Should add a new user to a room and receive the same text', (done) => {
    expect.assertions(2);
    client1.on('server.initialState', (msg) => {
      const obj = { text: '// your code here' };
      expect(JSON.stringify(msg)).toBe(JSON.stringify(obj));
      client2.on('server.initialState', msg => {
        expect(JSON.stringify(msg)).toBe(JSON.stringify(obj));
        done();
      });
    });
  });
  // Expects clients to be able to connect with one another
  test('Should be able to hear emissions from other clients', (done) => {
    expect.assertions(1);
    client2.on('server.changed', payload => {
      expect(payload.text).toBe('console.log(2)');
      done();
    });
    client1.emit('client.update', { text: 'console.log(2)'});
  });
  // // Expects clients to disconnect
  test('Client should have disconnected', () => {
    expect.assertions(1);
    client1.on('server.leave', () => {
      console.log('we shoudl be here')
      expect(1).toBe(1);
    });
    client1.emit('client.disconnect')
  });
});
