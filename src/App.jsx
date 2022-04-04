import { useEffect, Suspense } from 'react';
import shallow from 'zustand/shallow';

import { useSelector, useDispatch } from 'react-redux';
import { setToken } from './store/tokenSlice';

import { useUser } from './store/user';

import { useLogin, useProfile } from './hooks/auth';

import Login from './components/login';
import Header from './components/header';

// Secret Page
import PlaylistCreator from './pages/secret/playlist-creator';

function App() {
  const token = useSelector((state) => state.token.value);
  // eslint-disable-next-line no-console
  console.log('token', token);
  const dispatch = useDispatch();

  const [, interceptLoginRedirect] = useLogin();
  const [getProfile] = useProfile();
  const [logged, getUser] = useUser(
    (state) => [state.logged, state.getUser],
    shallow
  );

  useEffect(() => {
    const user = getUser();
    if (!user.token) {
      interceptLoginRedirect();
    } else {
      dispatch(setToken(user.token));
      getProfile();
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="app">
        {!logged && <Login />}
        {logged && (
          <>
            <Header />
            <PlaylistCreator />
          </>
        )}
      </div>
    </Suspense>
  );
}

export default App;
