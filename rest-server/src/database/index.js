import mongoose from 'mongoose';
import log from '../lib/log';

const uri = `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;

mongoose.connect(uri);

mongoose.connection.on('connected', () => {  
  log('Mongoose default connection open to mongodb://127.0.0.1:27017/codesling');
});

mongoose.connection.on('error', (error) => {
  log('Mongoose default connection error: ', error);
});

mongoose.connection.on('disconnected', () => {
  log('Mongoose default connection disconnected');
});

const db = mongoose.connection;

module.exports = db;
