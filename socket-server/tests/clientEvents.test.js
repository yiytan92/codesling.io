const ioClient = require('socket.io-client/dist/socket.io.js');

const clientEvents = require('../src/clientEvents');

describe('All client events should be functions', () => {
  // Expects all clientEvents to be functions
  test('client.ready should be a function', () => {
    expect(typeof clientEvents.default['client.ready']).toMatchSnapshot();
  });

  test('client.update should be a function', () => {
    expect(typeof clientEvents.default['client.update']).toMatchSnapshot();
  });

  test('client.disconnect should be a function', () => {
    expect(typeof clientEvents.default['client.disconnect']).toMatchSnapshot();
  });
});
