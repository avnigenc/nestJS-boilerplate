import constants from '../../common/constants/application';

module.exports = {
  ENV: 'dev',
  HOST: '0.0.0.0',
  PORT: 3000,
  REQUEST_TIMEOUT: 10000,
  EXAMPLE_DB: 'mongodb://localhost:27017/example',
  REDIS_URL: 'redis://localhost:6379/',
  EXTERNAL_SERVICE_URLS: {
    [constants.SERVICES.JSON_PLACE_HOLDER]: 'https://jsonplaceholder.typicode.com/',
  },
};
