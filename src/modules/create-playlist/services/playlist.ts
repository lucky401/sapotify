import {AxiosResponse} from 'axios';
import resource from 'lib/client';

/**
 * create playlist
 * @param {string} userID
 * @param {object} payload
 * @returns {Promise}
 */
function create(
  userID: string,
  payload: {
    name: string;
    description: string;
  },
): Promise<AxiosResponse<any, any>> {
  const data = {
    name: payload.name,
    description: payload.description,
    collaborative: false,
    public: false,
  };
  return resource.post(`/users/${userID}/playlists`, data);
}

/**
 * add selected tracks to playlist
 * @param {string} playlistID
 * @param {array} tracks
 * @returns {Promise}
 */
function addTracks(
  playlistID: string,
  uris: string[],
): Promise<AxiosResponse<any, any>> {
  const data = {uris};
  return resource.post(`/playlists/${playlistID}/tracks`, data);
}

export {create, addTracks};
