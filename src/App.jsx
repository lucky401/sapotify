import { useEffect, Suspense } from 'react';
import shallow from 'zustand/shallow';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setToken } from './store/tokenSlice';

import { useUser } from './store/user';

import { useLogin, useProfile } from './hooks/auth';

import Header from './components/header';

// Secret Page
import PlaylistCreator from './pages/secret/playlist-creator';

import Login from './pages/login';

function SecretPage({ children }) {
  const history = useHistory();
  const [getUser] = useUser((state) => [state.getUser], shallow);

  useEffect(() => {
    const user = getUser();
    if (!user.token) {
      history.push('/');
    }
  }, []);

  return children;
}

function App() {
  const history = useHistory();
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
      history.push('/create-playlist');
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="app">
        {logged && <Header />}
        <Router>
          <Switch>
            <Route path="/">
              <Login />
            </Route>
            <SecretPage>
              <Route path="/create-playlist">
                <PlaylistCreator />
              </Route>
            </SecretPage>
          </Switch>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
