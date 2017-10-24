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
      res.status(200).send(user);
    } catch (error) {
      log('Error in userFetch ', error);      
      res.status(400).send(error);
    }
  },
  userPost: async (req, res) => {
    const newUser = new User(req.body);
    try {
      await newUser.save();
      log('User successfully created');
      res.status(200).send(newUser);
    } catch (error) {
      log('Error in userPost ', error);
      res.status(400).send(error);
    }
  },
  userUpdate: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      user.username = req.body.username;
      user.password = req.body.password;
      await user.save();
      log('User successfully updated');
      res.status(200).send(user);
    } catch (error) {
      log('Error in userUpdate ', error);
      res.status(400).send(error);
    }
  },
  userDelete: async (req, res) => {
    try {
      const userDeleted = await User.findByIdAndRemove(req.params.id);
      log('User successfully deleted');
      res.status(200).send(userDeleted);
    } catch (error) {
      log('Error in userDelete ', error);
      res.send(400).send(error);
    }
  },
};
