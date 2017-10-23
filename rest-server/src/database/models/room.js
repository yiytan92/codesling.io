import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({

});

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room };
