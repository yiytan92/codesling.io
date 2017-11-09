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

// export const refreshToken = (req, res, next) => {
//   try {
//     const token = jwt.decode(req.body.token, process.env.TOKEN_SECRET);
//     const newToken = generateToken(req.body.token);
//     next(newToken);
//   } catch (e) {
//     log('error refreshing token');
//     next(e);
//   }
// };

export const verifyUserWithJWT = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization.slice(7), process.env.TOKEN_SECRET);
    log('token verified');
    next();
  } catch (e) {
    log('token not verified');
    next(e);
  }
};

// export const logout = async (req, res, next) => {
//   const { accessToken } = req.body;
//   try {
//     // delete the token
//   } catch (e) {
//     log('error logging out');
//     next(e);
//   }
// };
