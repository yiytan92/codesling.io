// root configuration file
module.exports = {
  /**
   *
   *  Local / Development
   *
   *  @url {NA}
   */
  development: {
    defaults: {
      NODE_ENV: 'DEVELOPMENT',
      DEBUG: 'TRUE'
    },
    directories: {
      'client': {
        envPrefix: 'REACT_APP_'
      },
      'rest-server': {
        host: 'http://localhost',
        port: '4990'
      },
      'socket-server': {
        host: 'http://localhost',
        port: '4155'
      },
      'coderunner-service': {
        host: 'http://localhost',
        port: '4000'
      }
    }
  }
};
