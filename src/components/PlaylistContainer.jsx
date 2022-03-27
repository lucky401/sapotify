import PlaylistItem from './PlaylistItem';

import { SPOTIFY_PLAYLIST_MOCK_DATA } from '../constants';

function PlaylistContainer() {
  /**
   * Given a list of Spotify playlist items, return a list of React components that represent each item
   * @returns A list of playlist items.
   */
  function renderPlaylistItems() {
    return SPOTIFY_PLAYLIST_MOCK_DATA.map((item) => {
      const { id, album, name: songName, artists } = item;
      return (
        <PlaylistItem
          key={id}
          image={album.images[0]?.url}
          songName={songName}
          albumName={album.name}
          artists={artists}
        />
      );
    });
  }

  return <div className="playlist-container">{renderPlaylistItems()}</div>;
}

export default PlaylistContainer;
