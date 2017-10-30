import {
  serverInitialState,
  serverChanged,
  serverLeave,
} from '../src/serverEvents';

// Expects all serverEvents to be functions
test('serverInitialState should be a function', () => {
  expect(typeof serverInitialState).toMatchSnapshot();
});

test('serverChanged should be a function', () => {
  expect(typeof serverChanged).toMatchSnapshot();
});

test('serverLeave should be a function', () => {
  expect(typeof serverLeave).toMatchSnapshot();
});
