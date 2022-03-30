import { generateRandomString } from '../../utils/helper';
import * as storage from '../../utils/storage';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000';
const SCOPES = 'playlist-modify-private';

export default {
  login() {
    const STATE = generateRandomString(16);
    storage.setStorage('STATE_KEY', STATE);
    // redirect to spotify auth page
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=token&state=${STATE}`;
  },
  logout() {
    storage.clearStorage();
    window.location.reload();
  },
};
