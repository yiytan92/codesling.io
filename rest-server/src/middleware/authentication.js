import jwt from 'jsonwebtoken';
import log from '../lib/log';

export const generateToken = ({ username, id }) => {
  const token = {};

  token.accessToken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    username,
    id,
  }, process.env.TOKEN_SECRET);

  // token.refreshToken = jwt.sign({
  //   username,
  //   id,
  // }, process.env.TOKEN_SECRET);

  return token;
};

export const refreshToken = (req, res, next) => {
  try {
    const token = generateToken(req.body.token);
    next(token);
  } catch (error) {
    log('Error refreshing token');
    next(error);
  }
};

export const verifyUserWithJWT = (req, res, next) => {
  try {
    jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    log('user authenticated');
    next();
  } catch (error) {
    log('user not authenticated');
  }
};

export const logout = async (req, res, next) => {
  const { accessToken } = req.body;
  try {
    // delete the token
  } catch (error) {
    log('Error logging out');
    next(error);
  }
};
