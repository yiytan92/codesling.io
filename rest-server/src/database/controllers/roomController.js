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
      return res.status(200).json({
        success: true,
        room,
      });
    } catch (error) {
      log('Error in roomFetch ', error);
      return res.status(400).json({
        success: false,
        error,
      });
    }
  },
  roomPost: async (req, res) => {
    const newRoom = new Room(req.body);
    try {
      await newRoom.save();
      log('Room successfully created');
      return res.status(200).json({
        success: true,
        newRoom,
      });
    } catch (error) {
      log('Error in roomPost ', error);
      return res.status(400).json({
        success: false,
        error,
      });
    }
  },
  roomUpdate: async (req, res) => {
    const room = await Room.findById(req.params.id);
    try {
      room.text = req.body.text;
      await room.save();
      log('Room successfully updated');
      return res.status(200).json({
        success: true,
        room,
      });
    } catch (error) {
      log('Error in roomUpdate ', error);
      return res.status(400).json({
        success: false,
        error,
      });
    }
  },
  roomDelete: async (req, res) => {
    try {
      const roomDeleted = await Room.findByIdAndRemove(req.params.id);
      log('Room successfully deleted');
      return res.status(200).json({
        success: true,
        roomDeleted,
      });
    } catch (error) {
      log('Error in roomDelete ', error);
      return res.status(400).json({
        success: false,
        error,
      });
    }
  },
};
