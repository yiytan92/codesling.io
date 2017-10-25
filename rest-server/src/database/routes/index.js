import express from 'express';

import {
  userFetch,
  userPost,
  userUpdate,
  userDelete } from '../controllers/userController';
import {
  roomFetch,
  roomPost,
  roomUpdate,
  roomDelete } from '../controllers/roomController';
import {
  codeRunner } from '../controllers/codeRunnerController';

const router = express.Router();

// CRUD ops for users
router.route('/users/:id')
  .get(userFetch)
  .post(userPost)
  .put(userUpdate)
  .delete(userDelete);

// CRUD ops for rooms
router.route('/rooms/:id')
  .get(roomFetch)
  .post(roomPost)
  .put(roomUpdate)
  .delete(roomDelete);

// Route for code runner service
router.route('/run')
  .post(codeRunner);

module.exports = router;
