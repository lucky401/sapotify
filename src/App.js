import { useEffect } from 'react';

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
      <form className="form">
        <label htmlFor="title">Title</label>
        <input placeholder="Title" type="text" name="title" id="title" />
        <label htmlFor="description">Description</label>
        <textarea
          placeholder="Description"
          name="description"
          id="description"
        />
        <input type="submit" value="Create Playlist" />
        <div className="playlist-container">
          <div className="playlist-item">
            <img
              className="playlist-image"
              src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
              alt="playlist"
            />
            <div className="playlist-content">
              <h2 className="playlist-title">Title</h2>
              <h3 className="playlist-description">Artists ~ Albums</h3>
            </div>
            <div className="playlist-actions">
              <button className="playlist-action">Add to playlist</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
