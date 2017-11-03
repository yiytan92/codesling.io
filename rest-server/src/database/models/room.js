import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
  slingId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room };
