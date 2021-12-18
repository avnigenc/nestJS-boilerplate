import constants from '../../common/constants/application';

module.exports = {
  ENV: process.env.NODE_ENV || 'prod',
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 3000,
  REQUEST_TIMEOUT: process.env.REQUEST_TIMEOUT || 10000,
  EXAMPLE_DB: process.env.MONGO_URI,
  REDIS_URL: process.env.REDIS_URL,
  EXTERNAL_SERVICE_URLS: {
    [constants.SERVICES.JSON_PLACE_HOLDER]: process.env.JSON_PLACE_HOLDER_SERVICE || '',
  },
};
