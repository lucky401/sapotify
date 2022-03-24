import PlaylistItem from './PlaylistItem';

import { SPOTIFY_PLAYLIST_MOCK_DATA } from '../constants';

const { album, name: songName, artists } = SPOTIFY_PLAYLIST_MOCK_DATA;

function PlaylistContainer() {
  return (
    <div className="playlist-container">
      <PlaylistItem
        image={album?.images[0]?.url}
        songName={songName}
        albumName={album?.name}
        artists={artists}
      />
    </div>
  );
}

export default PlaylistContainer;
