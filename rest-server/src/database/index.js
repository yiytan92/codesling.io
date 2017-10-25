import mongoose from 'mongoose';
import log from '../lib/log';

const uri = `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;

mongoose.connect(uri, (err) => {
  if (err) {
    log('Error in mongodb connection ', err);
  } else {
    log('Successfully connected to mongodb');
  }
});

const db = mongoose.connection;

module.exports = db;
