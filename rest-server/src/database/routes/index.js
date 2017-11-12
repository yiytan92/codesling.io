import express from 'express';

import {
  authUser,
  hashUser,
  userUpdate,
  userDelete,
} from '../controllers/userController';
import {
  slingFetch,
  slingPost,
  slingUpdate,
  slingDelete,
  fetchNewSlingId,
} from '../controllers/slingController';
import { verifyUserWithJWT } from '../../middleware/authentication';

const router = express.Router();

// Authorization route for login
router.route('/users/auth')
  .post(authUser);

// CRUD ops for users
router.route('/users/:id')
  .post(hashUser)
  .put(userUpdate)
  .delete(userDelete);

// CRUD ops for slings
router.route('/slings/:slingId')
  .get(slingFetch)
  .post(verifyUserWithJWT, slingPost)
  .put(slingUpdate)
  .delete(verifyUserWithJWT, slingDelete);

router.route('/new-sling')
  .get(verifyUserWithJWT, fetchNewSlingId);

module.exports = router;
