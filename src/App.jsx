import { useState, useEffect } from 'react';

import Login from './components/login';
import Header from './components/header';
import PlaylistCreator from './components/playlist-creator';

import profileService from './api/services/profile';

import { isAuth } from './utils/OAuth';

function App() {
  const [profile, setProfile] = useState(null);

  const getCurrentUserProfile = async () => {
    try {
      const { data } = await profileService.getCurrentUserProfile();
      setProfile(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuth) {
      getCurrentUserProfile();
    }
  }, []);

  return (
    <div className="app">
      {!isAuth && <Login />}
      {isAuth && (
        <>
          <Header username={profile?.display_name} />
          <PlaylistCreator userId={profile?.id} />
        </>
      )}
    </div>
  );
}

export default App;
