/**
 * 
 *  Server emissions
 * 
 */
export const serverInitialState = ({ client, room }) => {
  client.emit('server.initialState', {
    text: room.get('text')
  });
};

export const serverChanged = ({ io, client, room }) => {
  const roomId = room.get('id');
  const text = room.get('text');
  io
    .in(roomId)
    .emit('server.changed', { text });
};

export const serverLeave = ({ io, room }) => {
  io
    .in(room.get('id'))
    .emit('server.leave');
};
