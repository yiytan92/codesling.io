// const io = require('socket.io-client');

// require('dotenv').config();
// require('dotenv').load();

// // Expects people to be able to connect to the socket-server
// test('Should broadcast that a new user has joined the room', () => {
//   let clientCount = 0;
//   const client1 =  io.connect(process.env.TEST_SOCKET_SERVER_PORT);
//   client1.on('connect', () => {
//     client1.emit('client.ready');
//     clientCount += 1;
//     client1.disconnect();
//     });
//   const client2 = io.connect(process.env.TEST_SOCKET_SERVER_PORT);
//   client2.on('connect', () => {
//     client2.emit('client.ready');
//     clientCount += 1;
//     client2.disconnect();
//   });
//   setTimeout(() => expect(clientCount).toBe(2), 1000);
// });

test('nothing', () => {})