import { useState } from 'react';

import PlaylistContainer from '../playlist-container';
import SearchBar from '../search-bar';

import trackService from '../../api/services/track';
import playlistService from '../../api/services/playlist';

import './index.css';

function PlaylistCreator() {
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');

  const geTracks = async (query) => {
    try {
      const {
        data: {
          tracks: { items },
        },
      } = await trackService.search(query);
      setTracks(items);
    } catch (e) {
      const errorMessage = e.response.data.error.message;
      setError(errorMessage);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target[0].value;
    await geTracks(query);
  };

  const handleSelectTrack = (URI) => {
    const alreadySelected = !!selectedTracks.find(
      (selectedTrack) => selectedTrack === URI
    );

    if (alreadySelected) {
      setSelectedTracks(
        selectedTracks.filter((selectedTrack) => selectedTrack !== URI)
      );
    } else {
      setSelectedTracks((st) => [...st, URI]);
    }
  };

  const handleCreatePlaylist = async (event) => {
    event.preventDefault();
    try {
      const {
        data: { id },
      } = await playlistService.create(playlistTitle, playlistDescription);
      await playlistService.addTracks(id, selectedTracks);
      setSelectedTracks([]);
      setPlaylistTitle('');
      setPlaylistDescription('');
    } catch (e) {
      const errorMessage = e.response.data.error.message;
      setError(errorMessage);
    }
  };

  return (
    <>
      <form
        onSubmit={handleCreatePlaylist}
        className="form form-create-playlist"
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={playlistTitle}
          onInput={(event) => setPlaylistTitle(event.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={playlistDescription}
          onInput={(event) => setPlaylistDescription(event.target.value)}
        />
        <input type="submit" value="Create Playlist" />
      </form>
      <span>Select song that you want to include</span>
      <SearchBar onSearchChange={handleSearch} />
      {!error && tracks.length > 0 && (
        <PlaylistContainer
          tracks={tracks}
          onSelectTrack={handleSelectTrack}
          selectedTracks={selectedTracks}
        />
      )}
      {!error && tracks.length === 0 && <p>No tracks found</p>}
      {error && <p>{error}</p>}
    </>
  );
}

export default PlaylistCreator;
