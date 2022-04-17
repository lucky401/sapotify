/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */

const APP_NAME = require('../../../../package.json').name;

const ENVIRONMENT = process.env.REACT_APP_STAGE || 'local';

export const TOKEN_STORAGE_KEY = `${APP_NAME}_${ENVIRONMENT}_token`;
export const USER_STORAGE_KEY = `${APP_NAME}_${ENVIRONMENT}_user`;
export const STATE_SPOTIFY_AUTH_KEY = `${APP_NAME}_${ENVIRONMENT}_spotify_auth`;

export interface User {
  id: string;
  display_name: string;
  country: string;
  email: string;
  avatar: string;
  products: string;
  type: string;
  uri: string;
}

export const AUTH_PROVIDER_CONFIG = {
  endpoint: {
    me: '/me',
  },
};
