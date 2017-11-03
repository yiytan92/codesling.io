import mongoose from 'mongoose';
import bluebird from 'bluebird';

import { Room } from '../models/room';
import log from '../../lib/log';
import generateSlingId from '../../lib/generateSlingId';

mongoose.Promise = bluebird;

const existsInDatabase = async (slingId) => {
  const room = await Room.findOne({ slingId });
  return !!room;
};

export const fetchNewSlingId = async (req, res) => {
  try {
    let slingId = generateSlingId();
    // regenerate slingId if it already exists
    while (await existsInDatabase(slingId)) {
      slingId = generateSlingId();
    }
    return res.json({
      success: true,
      slingId,
    });
  } catch (error) {
    log('Error fetching newSlingId', error);
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

export const roomFetch = async (req, res) => {
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
};

export const roomPost = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
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
};

export const roomUpdate = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
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
};

export const roomDelete = async (req, res) => {
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
};

