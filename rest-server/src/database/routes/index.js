import express from 'express';
import { userFetch, userPost, userUpdate, userDelete } from '../controllers/userController';
import { roomFetch, roomPost } from '../controllers/roomController';

const router = express.Router();

// User routes for fetching a user and adding a user to the database
router.route('/users/:id')
  .get(userFetch)
  .post(userPost)
  .put(userUpdate)
  .delete(userDelete);

// Room routes for fetching a room and adding a room to the database
router.route('/rooms')
  .get(roomFetch)
  .post(roomPost);

module.exports = router;
