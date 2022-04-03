import resource from '../resource';

export default {
  /**
   * create playlist
   * @param {string} userID
   * @param {object} payload
   * @returns {Promise}
   */
  create(userID, payload) {
    const data = {
      name: payload.name,
      description: payload.description,
      collaborative: false,
      public: false,
    };
    return resource.post(`/users/${userID}/playlists`, data);
  },

  /**
   * add selected tracks to playlist
   * @param {string} playlistID
   * @param {array} tracks
   * @returns {Promise}
   */
  addTracks(playlistID, uris) {
    const data = { uris };
    return resource.post(`/playlists/${playlistID}/tracks`, data);
  },
};
