import mongoose from 'mongoose';

import { Room } from '../models/room';
import log from '../../lib/log';

module.exports = {
  roomFetch: async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).send(room);
    } catch (error) {
      log('Error in roomFetch ', error);
      res.status(400).send(error);
    }
  },
  roomPost: async (req, res) => {
    const newRoom = new Room(req.body);
    try {
      newRoom.save((err) => {
        if (err) {
          log('Error saving room ', err);
        } else {
          log('Successfully saved room');
          res.status(200).send(newRoom);
        }
      });
    } catch (error) {
      log('Error in roomPost ', error);
      res.status(400).send(error);
    }
  },
  roomUpdate: (req, res) => {
    try {
      Room.findById(req.params.id, (err, room) => {
        if (err) {
          log('Error in userUpdate ', err);
        } else {
          room.text = req.body.text;
          room.save((error, updatedRoom) => {
            if (error) {
              log('Error updating room ', error);
            } else {
              res.status(200).send(updatedRoom);
            }
          });
        }
      });
    } catch (error) {
      log('Error in roomUpdate ', error)
      res.status(400).send(error);
    }
  },
};
