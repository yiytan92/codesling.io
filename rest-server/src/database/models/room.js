import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room };
