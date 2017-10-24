import mongoose from 'mongoose';
import bluebird from 'bluebird';

import { Room } from '../models/room';
import log from '../../lib/log';

mongoose.Promise = bluebird;

module.exports = {
  roomFetch: async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      log('Room successfully fetched');
      res.status(200).send(room);
    } catch (error) {
      log('Error in roomFetch ', error);
      res.status(400).send(error);
    }
  },
  roomPost: async (req, res) => {
    const newRoom = new Room(req.body);
    try {
      await newRoom.save();
      log('Room successfully created');
      res.status(200).send(newRoom);
    } catch (error) {
      log('Error in roomPost ', error);
      res.status(400).send(error);
    }
  },
  roomUpdate: async (req, res) => {
    try {
      const room = Room.findById(req.params.id);
      room.text = req.body.text;
      await room.save();
      log('Room successfully updated');
      res.status(200).send(room);
    } catch (error) {
      log('Error in roomUpdate ', error);
      res.status(400).send(error);
    }
  },
  roomDelete: async (req, res) => {
    try {
      const roomDeleted = await Room.findByIdAndRemove(req.params.id);
      log('Room successfully deleted');
      res.status(200).send(roomDeleted);
    } catch (error) {
      log('Error in roomDelete ', error);
      res.status(400).send(error);
    }
  },
};
