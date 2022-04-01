import { useEffect, useState } from 'react';
import PlaylistItem from './PlaylistItem';

function PlaylistContainer({ tracks }) {
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [combinedTracks, setCombinedTracks] = useState([]);

  /**
   * Given a track, if it's already selected, remove it from the list of selected tracks.
   * Otherwise, add it to the list of selected tracks
   */
  const handleSelectTrack = (track) => {
    const alreadySelected = selectedTracks.find((t) => t.id === track.id);
    if (alreadySelected) {
      setSelectedTracks(selectedTracks.filter((t) => t.id !== track.id));
    } else {
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  useEffect(() => {
    const combinedTracksWithSelectedTrack = tracks.map((track) => ({
      ...track,
      isSelected: selectedTracks.find((t) => t.id === track.id),
    }));
    setCombinedTracks(combinedTracksWithSelectedTrack);
  }, [selectedTracks, tracks]);

  /**
   * Given a list of Spotify playlist items, return a list of React components that represent each item
   * @returns A list of playlist items.
   */
  function renderPlaylistItems() {
    return combinedTracks.map((item) => {
      const { id } = item;
      return (
        <PlaylistItem key={id} track={item} onSelectTrack={handleSelectTrack} />
      );
    });
  }

  return <div className="playlist-container">{renderPlaylistItems()}</div>;
}

export default PlaylistContainer;
