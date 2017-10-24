import mongoose from 'mongoose';
import log from '../lib/log';

// require('dotenv').config();
// require('dotenv').load();

const uri = `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;


mongoose.connect(uri, (err) => {
  err ? log('Error in mongodb connection ', err) : log('Successfully connected to mongodb');
});

const db = mongoose.connection;

module.exports = db;
