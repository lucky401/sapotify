import { useEffect } from 'react';

import { SPOTIFY_PLAYLIST_MOCK_DATA } from './constants';

const { name: songName, artists, album } = SPOTIFY_PLAYLIST_MOCK_DATA;

const getPlaylist = async () => {
  try {
    const response = await fetch(
      'https://gist.githubusercontent.com/aryapradipta9/e6492383477803b233916e01f36d5465/raw/66942c739d66d3774303f84071696aa865a07077/single-sample.json'
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    alert(error);
  }
};

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY;

function App() {
  useEffect(() => {
    console.log(SPOTIFY_CLIENT_ID);
    getPlaylist();
  }, []);

  return (
    <div className="app">
      <h1 className="title">Create Playlist</h1>
      <div className="playlist-container">
        <div className="playlist-item">
          <img
            className="playlist-image"
            src={album.images[0].url}
            alt={songName}
          />
          <div className="playlist-content">
            <h2 className="playlist-title">{songName}</h2>
            <h3 className="playlist-description text-truncate">
              {artists.map((artist) => artist.name).join(', ')}
            </h3>
            <h3 className="playlist-description text-truncate">{album.name}</h3>
          </div>
          <div className="playlist-actions">
            <button className="playlist-action">Select</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
