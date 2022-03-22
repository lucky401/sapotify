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
      <h1 className="title">Hello World!</h1>
    </div>
  );
}

export default App;
