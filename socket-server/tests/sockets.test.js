const io = require('socket.io-client');

require('dotenv').config();
require('dotenv').load();

// log('this is the client in clientevents ', io.eio.clientsCount)

// let clientCount = 0;
// beforeEach(() => {
//   const client1 = io.connect(process.env.TEST_SOCKET_SERVER_PORT);
//   // let clientCount = 0;
//   client1.on('connect', client => {
//     client1.emit('connection made');
//     clientCount += 1;
//     const client2 = io.connect(process.env.TEST_SOCKET_SERVER_PORT);
//     client2.on('connect', client => {
//       client2.emit('connection made');
//       clientCount += 1;
//       console.log('this is the clientCount ', clientCount)
//     });
//   });
// });
// afterEach(() => {
//   clientCount = 0;
// })

// Expects people to be able to connect to the socket-server
test('Should broadcast that a new user has joined the room', () => {
  const client1 = io.connect(process.env.TEST_SOCKET_SERVER_PORT);
  let clientCount = 0;
  client1.on('connect', client => {
    client1.emit('connection made');
    clientCount += 1;
    const client2 = io.connect(process.env.TEST_SOCKET_SERVER_PORT);
    client2.on('connect', client => {
      client2.emit('connection made');
      clientCount += 1;
      expect(clientCount).toBe(2);
    });
  });
});



