const clientEvents = require('../src/clientEvents');

//Expects all clientEvents to be functions
test('client.ready should be a function', () => {
  expect(typeof clientEvents.default['client.ready']).toBe('function');
});

test('client.update should be a function', () => {
  expect(typeof clientEvents.default['client.update']).toBe('function');
});

test('client.disconnect should be a function', () => {
  expect(typeof clientEvents.default['client.disconnect']).toBe('function');
});

