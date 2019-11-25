import dotenv from 'dotenv';
dotenv.config();

export default {
  server: {
    port: process.env.SERVER_PORT || 3000
  },
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    password:  process.env.REDIS_PWD || ''
  },
  logger: {
    format: process.env.LOGGER_FORMAT || 'dev'
  }
};
