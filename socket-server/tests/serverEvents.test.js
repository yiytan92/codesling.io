const {
  serverInitialState,
  serverChanged,
  serverLeave
} = require('../src/serverEvents');

// Expects all serverEvents to be functions
test('serverInitialState should be a function', () => {
  expect(typeof serverInitialState).toBe('function');
});

test('serverChanged should be a function', () => {
  expect(typeof serverChanged).toBe('function');
});

test('serverLeave should be a function', () => {
  expect(typeof serverLeave).toBe('function');
});
