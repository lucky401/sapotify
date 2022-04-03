import React from 'react';
import ReactDOM from 'react-dom';

import { interceptSpotifyAuthRedirect } from './utils/OAuth';
import * as storage from './utils/storage';

import './index.css';

import App from './App';

(() => {
  try {
    const { token, type } = interceptSpotifyAuthRedirect();
    storage.setStorage('TOKEN', token);
    storage.setStorage('TOKEN_TYPE', type);
  } catch (error) {
    storage.clearStorage();
  }
})();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
