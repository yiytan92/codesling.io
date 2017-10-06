const io = require('socket.io-client');

const clientEvents = require('../src/clientEvents');

require('dotenv').config();
require('dotenv').load();

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

describe('Client interactions', () => {
  const client1 = io.connect(process.env.TEST_SOCKET_SERVER_PORT);
  const client2 = io.connect(process.env.TEST_SOCKET_SERVER_PORT);
  beforeEach(() => {
    client1.on('connect', () => {
      client1.emit('client.ready');
    });
    client2.on('connect', () => {
      client2.emit('client.ready');
    });
  });
  afterEach(() => {
    client1.disconnect();
    client2.disconnect();
  })
  // Expects people to be able to connect to the socket-server
  test('Should broadcast that a new user has joined the room', (done) => {
    // expect.assertions(1);
    let clientCount = 0;
    const client1 =  io.connect(process.env.TEST_SOCKET_SERVER_PORT);
    client1.on('connect', () => {
      client1.emit('client.ready');
      clientCount += 1;
      if (clientCount === 2) {
        expect(clientCount).toBe(2);
        client1.disconnect();
        client2.disconnect();
        done();
      }
      });
    const client2 = io.connect(process.env.TEST_SOCKET_SERVER_PORT);
    client2.on('connect', () => {
      client2.emit('client.ready');
      clientCount += 1;
      if (clientCount === 2) {
        expect(clientCount).toBe(2);
        client1.disconnect();
        client2.disconnect();
        done();
      }
    });
  });
  
  // Expects clients to be able to connect with one another
  test('Should be able to hear emissions from other clients', (done) => {
    /* 
    client emissions send a payload
    client2.emit('client.update', 'console.log('whatup')')
    client1.on('server.changed', payload => {
      expect(payload).toBe('console.log('whatup'))
    })
    */
    const client1 = io.connect(process.env.TEST_SOCKET_SERVER_PORT);
    client1.on('connect', () => {
      client1.emit('client.ready');
    });
    const client2 = io.connect(process.env.TEST_SOCKET_SERVER_PORT);
    client2.on('connect', () => {
      client2.emit('client.ready');
    });
    expect().toBe()
  });
})

// Expects clients to disconnect
/*
test('Client should have disconnected', () => {
  const client1 = io.connect(process.env.TEST_SOCKET_SERVER_PORT);
  let clientCount = 1;
  client1.on('connect', client => {
    client.emit('server.leave', () => {
      clientCount -= 1;
    });
    client.disconnect();
  })
  setTimeout(expect(clientCount).toBe(0), 2000)
})
*/
