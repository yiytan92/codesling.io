import _ from 'lodash';
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../../rest-server/.env') });

import dbConfigs from './config';
import help from './help';

const command = process.argv[3];
const commandObj = dbConfigs[command];

if (!commandObj) {
  console.log(`${command} is not a valid command name to configure seed data.`);
  console.log(help);
  process.exit(1);
}

if (!process.env.MONGO_DB_NAME) {
  console.log(`env file does not exist. \n Please make sure env setup is complete.`);
  process.exit(1);
}

try {
  Object
    .keys(commandObj)
    .forEach(option => {
      commandObj[option];
    });
    console.log(`successfully ${command === 'seed' ? 'seeded' : 'wiped'} database.`);
} catch (e) {
  console.log(`error ${command}ing database. e = ${e}`);
  process.exit(1);
}