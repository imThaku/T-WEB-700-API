import * as dotenv from 'dotenv';

import errors from '../assets/i18n/en/errors';
import messages from '../assets/i18n/en/messages';

dotenv.config();

const isprodEnvironment = process.env.NODE_ENV === 'prod';

export default {
  errors,
  messages,
  name: 'V2X Core',
  version: '1.0',
  host: process.env.APP_HOST || '127.0.0.1',
  environment: process.env.NODE_ENV || 'developement',
  port: (isprodEnvironment ? process.env.PROD_APP_PORT : process.env.APP_PORT) || '8000',
  pagination: {
    page: 1,
    maxRows: 20
  },
  auth: {
    secretKey: process.env.SECRET_KEY || '4C31F7EFD6857D91E729165510520424'
  },
  db: {
    host: (isprodEnvironment ? process.env.PROD_DB_HOST : process.env.DB_HOST),
    port: (isprodEnvironment ? process.env.PROD_DB_PORT : process.env.DB_PORT),
    username: (isprodEnvironment ? process.env.PROD_DB_USERNAME : process.env.DB_USERNAME),
    password: (isprodEnvironment ? process.env.PROD_DB_PASSWORD : process.env.DB_PASSWORD),
    database: (isprodEnvironment ? process.env.PROD_DB_NAME : process.env.DB_NAME),
  },
  logging: {
    dir: process.env.LOGGING_DIR || 'logs',
    level: process.env.LOGGING_LEVEL || 'debug'
  }
};
