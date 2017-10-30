import ioClient from 'socket.io-client/dist/socket.io.js';

import clientEvents from '../src/clientEvents';

describe('All client events should be functions', () => {
  // Expects all clientEvents to be functions
  test('client.ready should be a function', () => {
    expect(typeof clientEvents['client.ready']).toMatchSnapshot();
  });

  test('client.update should be a function', () => {
    expect(typeof clientEvents['client.update']).toMatchSnapshot();
  });

  test('client.disconnect should be a function', () => {
    expect(typeof clientEvents['client.disconnect']).toMatchSnapshot();
  });
});
