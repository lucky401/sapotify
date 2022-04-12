import PlaylistItem from '../playlist-item';

import './index.css';

function PlaylistContainer({ tracks, onSelectTrack, selectedTracks }) {
  function renderPlaylistItems() {
    return tracks.map((item) => {
      const { uri } = item;
      return (
        <PlaylistItem
          key={uri}
          track={item}
          onSelectTrack={onSelectTrack}
          isSelected={selectedTracks.includes(uri)}
        />
      );
    });
  }

  return <div className="playlist-container">{renderPlaylistItems()}</div>;
}

export default PlaylistContainer;
