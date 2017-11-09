import path from 'path';
import { exec } from 'child_process';

const userSeedCmd = `mongoimport --db ${process.env.MONGO_DB_NAME} --collection users --drop --file ./usersSeedData.json --jsonArray`;
const roomSeedCmd = `mongoimport --db ${process.env.MONGO_DB_NAME} --collection rooms --drop --file ./roomsSeedData.json --jsonArray`;

const dbConfigs = {
  seed: {
    user: exec(userSeedCmd),
    room: exec(roomSeedCmd)
  },
  wipe: {
    data: exec(`mongo ${process.env.MONGO_DB_NAME} --eval "db.dropDatabase()"`)
  }
}

export default dbConfigs;