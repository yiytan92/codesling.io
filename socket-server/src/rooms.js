/**
 * 
 *  Rooms store
 * 
 */
export default class Rooms {
  constructor(io) {
    this.io = io;
    this._store = new Map();
  }

  findOrCreate(roomId) {
    let room = this._store.get(roomId);
    if (!room) {
      room = new Map();
      room.set('id', roomId);
      room.set('text', '// your code here');
      this._store.set(roomId, room);
    }
    return room;
  }
}
