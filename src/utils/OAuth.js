import { getStorage } from './storage';

import { STATE_SPOTIFY_AUTH_KEY } from '../constants';

/**
 * Check if the user is authenticated by checking if there is a token in local storage.
 * @returns A boolean value.
 */
export const isAuth = !!getStorage('TOKEN');

/**
 * It takes the hash from the URL and extracts the access token, token type, and expiration time
 * @returns The access token and token type
 */
export const interceptSpotifyAuthRedirect = () => {
  const STATE_KEY = getStorage(STATE_SPOTIFY_AUTH_KEY);

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
    .reduce((initial, item) => {
      if (item) {
        const parts = item.split('=');
        // eslint-disable-next-line no-param-reassign
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  window.location.hash = '';

  if (hash.state !== STATE_KEY) throw new Error('State mismatch');

  return {
    token: hash.access_token,
    type: hash.token_type,
  };
};
