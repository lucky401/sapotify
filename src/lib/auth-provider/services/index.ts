/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */

import {AxiosResponse} from 'axios';

import client from 'lib/client';
import * as storage from 'lib/storage';
import {generateRandomString} from 'lib/helper';

import {AUTH_PROVIDER_CONFIG, STATE_SPOTIFY_AUTH_KEY} from '../constants';

const ENVIRONMENT = process.env.REACT_APP_STAGE || 'local';
const CONFIG_ENVIRONMENT = require(`../../config/${ENVIRONMENT.toLowerCase()}.json`);

const {redirectURI, spotifyScope} = CONFIG_ENVIRONMENT.env;

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

const {endpoint} = AUTH_PROVIDER_CONFIG;

async function me(): Promise<AxiosResponse<unknown, unknown>> {
  return client.get(endpoint.me);
}

function login(): void {
  const STATE = generateRandomString(16);
  storage.setStorage(STATE_SPOTIFY_AUTH_KEY, STATE);
  // redirect to spotify auth page
  window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectURI}&scope=${spotifyScope}&response_type=token&state=${STATE}`;
}

const interceptSpotifyAuthRedirect = (): {token: string; type: string} => {
  const STATE_KEY = storage.getStorage(STATE_SPOTIFY_AUTH_KEY);

  if (!STATE_KEY) throw new Error('No state key found');

  if (!window.location.hash) {
    // get url query error
    const errorMessage = window.location.href.split('error=')[1];
    if (errorMessage) {
      throw new Error(errorMessage);
    } else {
      throw new Error('Something went wrong');
    }
  }

  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial: Record<string, string>, item) => {
      if (item) {
        const parts = item.split('=');
        // eslint-disable-next-line no-param-reassign
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

  if (hash.state !== STATE_KEY) throw new Error('State mismatch');

  return {
    token: hash.access_token,
    type: hash.token_type,
  };
};

export {me, interceptSpotifyAuthRedirect, login};
