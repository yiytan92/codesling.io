import ioClient from 'socket.io-client/dist/socket.io.js';

import clientEvents from '../src/clientEvents';

describe('All client events should be functions', () => {
  const fixtures = [
    'client.ready',
    'client.update',
    'client.disconnect',
  ];

  test('all client events should be a function', () => {
    fixtures.forEach(eventName => {
      expect(typeof clientEvents[eventName]).toMatchSnapshot();
    });
  });
});
