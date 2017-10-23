import mongoose from 'mongoose';
import bluebird from 'bluebird';

import { User } from '../models/user';
import log from '../../lib/log';

mongoose.Promise = bluebird;

module.exports = {
  userFetch: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  userPost: (req, res) => {
    const newUser = new User(req.body);
    try {
      newUser.save((err, userCreated) => {
        if (err) {
          log('Error saving user ', err);
        } else {
          log('Successfully saved user to the db');
          res.status(200).send(userCreated);
        }
      });
    } catch (error) {
      res.send(400).send(error);
    }
  },
  userUpdate: (req, res) => {
    try {
      User.findById(req.params.id, (err, user) => {
        if (err) {
          log('Error in userUpdate ', err);
        } else {
          user.username = req.body.username;
          user.password = req.body.password;
          user.save((error, updatedUser) => {
            if (error) {
              log('Error updating user ', error);
            } else {
              res.status(200).send(updatedUser);
            }
          });
        }
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  userDelete: (req, res) => {
    try {
      User.findByIdAndRemove(req.params.id, (err, user) => {
        const response = {
          message: 'User has been successfully deleted',
          id: user.id,
        };
        res.status(200).send(response);
      });
    } catch (error) {
      res.send(400).send(error);
    }
  },
};
