import { useState } from 'react';
import shallow from 'zustand/shallow';

import PlaylistContainer from '../../../components/playlist-container';
import SearchBar from '../../../components/search-bar';

import trackService from '../../../api/services/track';
import playlistService from '../../../api/services/playlist';

import { useUser } from '../../../store/user';

import './index.css';

function PlaylistCreator() {
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [errorForm, setErrorForm] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const [user] = useUser((state) => [state.user], shallow);

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
    setError(null);
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

  const resetPlaylistCreator = () => {
    setSelectedTracks([]);
    setPlaylistTitle('');
    setPlaylistDescription('');
  };

  const handleCreatePlaylist = async (event) => {
    event.preventDefault();

    if (!user?.id) return;

    setErrorForm(null);

    if (selectedTracks.length < 1) {
      setErrorForm('Please select at least one track');
      return;
    }

    if (!playlistTitle || !playlistDescription) {
      setErrorForm('Please fill in the required fields');
      return;
    }

    const payload = {
      name: playlistTitle,
      description: playlistDescription,
    };

    try {
      const {
        data: { id },
      } = await playlistService.create(user.id, payload);
      await playlistService.addTracks(id, selectedTracks);
      resetPlaylistCreator();
    } catch (e) {
      const errorMessage = e.response.data.error.message;
      setErrorForm(errorMessage);
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
          required
          id="title"
          type="text"
          name="title"
          value={playlistTitle}
          onInput={(event) => setPlaylistTitle(event.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          required
          type="text"
          name="description"
          id="description"
          value={playlistDescription}
          onInput={(event) => setPlaylistDescription(event.target.value)}
        />
        {errorForm && <p className="text-error my-2">{errorForm}</p>}
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
