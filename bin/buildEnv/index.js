import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import config from '../../config/env';
import help from './help';
import createFile from './createFile';

const env = process.argv[3];

if (!env) {
  console.log(`${env} is not a valid environment name to setup.`);
  console.log(help);
  process.exit();
}

try {
  const subAppDirNames = Object.keys(config[env].directories);
  subAppDirNames.forEach((subAppDirName) => {
    const envFile = createFile(env, subAppDirName);
    const isService = !!subAppDirName.match(/\-service/);
    const relativePath = `../../${isService ? 'services/' : ''}${subAppDirName}`;
    const folderPath = path.resolve(__dirname, relativePath);
    fs.writeFileSync(folderPath + '/.env', envFile);
  });
  console.log('successfully created .env files');
} catch (e) {
  console.log('error creating .env files. e = ', e);
  process.exit(1);
}

