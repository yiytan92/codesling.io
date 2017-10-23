import mongoose from 'mongoose';
import Room from '../models/room';
import log from '../../lib/log';

module.exports = {
  roomFetch: async (req, res) => {
    const room = await Room.findOne({});
    res.status(200).send(room);
  },
  roomPost: async (req, res) => {
    const newRoom = new Room(req.body);
    newRoom.save((err) => {
      if (err) {
        log('Error saving room ', err);
      } else {
        log('Successfully saved room');
        res.status(200).send(newRoom);
      }
    });
  },
};
