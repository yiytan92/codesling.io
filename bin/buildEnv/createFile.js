import _ from 'lodash';

import config from '../../config/env';

/**
 *
 *  createFile
 *
 *  @param envName       {STRING}
 *  @param directoryName {STRING}
 *
 *  @returns STRING
 */
const createEnvFile = (envName, directoryName) => {
  let file = ``;
  const configObj = config[envName];
  if (!configObj) {
    throw Error(`${envName} is not a valid environment name found in config/env.js`);
  }

  const defaults = configObj.defaults;
  const variablePrefix = configObj.directories[directoryName].envPrefix || '';
  const serversAndServices = _.pickBy(configObj.directories, (subAppSettings, subAppName) => {
    return !!subAppName.match(/\-server|-service/);
  });

  _.each(defaults, (value, key) => file += `${variablePrefix}${key}=${value}\n`);
  _.each(serversAndServices, (subAppSettings, subAppName) => {
    const { host, port } = subAppSettings;
    subAppName = subAppName.replace('-', '_');
    file += `${variablePrefix}${subAppName.toUpperCase()}_URL=${host}:${port}\n`
  });

  return file;
};

export default createEnvFile;
