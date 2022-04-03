import { generateRandomString } from '../../utils/helper';
import * as storage from '../../utils/storage';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const SCOPES = 'playlist-modify-private';

export default {
  login() {
    const STATE = generateRandomString(16);
    storage.setStorage('STATE_KEY', STATE);
    // redirect to spotify auth page
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=token&state=${STATE}`;
  },

  /* It clears the storage and reloads the page. */
  logout() {
    storage.clearStorage();
    window.location.reload();
  },
};
