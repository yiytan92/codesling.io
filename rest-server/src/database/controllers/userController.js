import mongoose from 'mongoose';
import bluebird from 'bluebird';

import { User } from '../models/user';
import log from '../../lib/log';

mongoose.Promise = bluebird;

module.exports = {
  userFetch: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      log('User successfully fetched');
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      log('Error in userFetch ', error);
      return res.status(400).json({
        success: false,
        error,
      });
    }
  },
  userPost: async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      log('User successfully created');
      return res.status(200).json({
        success: true,
        newUser,
      });
    } catch (error) {
      log('Error in userPost ', error);
      return res.status(400).json({
        success: false,
        error,
      });
    }
  },
  userUpdate: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      user.username = req.body.username;
      user.password = req.body.password;
      await user.save();
      log('User successfully updated');
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      log('Error in userUpdate ', error);
      return res.status(400).json({
        success: false,
        error,
      });
    }
  },
  userDelete: async (req, res) => {
    try {
      const userDeleted = await User.findByIdAndRemove(req.params.id);
      log('User successfully deleted');
      return res.status(200).json({
        success: true,
        userDeleted,
      });
    } catch (error) {
      log('Error in userDelete ', error);
      return res.status(400).json({
        success: false,
        error,
      });
    }
  },
};
