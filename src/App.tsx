import {Suspense, lazy, useEffect} from 'react';
import shallow from 'zustand/shallow';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate, Routes, Route} from 'react-router-dom';

import {RootState} from 'store';

import {useProfile} from 'lib/auth-provider/context/hooks';
import {setToken as setTokenRedux} from 'lib/auth-provider/store/tokenSlice';
import {tokenPersistance} from 'lib/auth-provider/persistance';
import {useAuth} from 'lib/auth-provider/context';

import {FullPageSpinner} from 'common/components/full-page-spinner';

const [, getTokenPersistance] = tokenPersistance();

const LoginModule = lazy(() => import('./modules/login'));
const CallbackLoginModule = lazy(() => import('./modules/callback'));
const CreatePlaylistModule = lazy(() => import('./modules/create-playlist'));

function SecretPage({children}: {children: JSX.Element}): JSX.Element {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.token.value);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return children;
}

function App(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [getAuth] = useAuth(state => [state.getAuth], shallow);
  const [getProfile] = useProfile();

  // use redux to store token
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/create-playlist');
    }
  }, [location, navigate]);

  useEffect(() => {
    const getUserProfile = async (): Promise<void> => {
      await getProfile();
    };
    const currentUser = getAuth();
    if (currentUser.token) {
      const userToken = getTokenPersistance();
      dispatch(setTokenRedux(userToken));
      getUserProfile();
    }
  }, []);

  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Routes>
        <Route path="/login/*" element={<LoginModule />} />
        <Route path="/callback" element={<CallbackLoginModule />} />
        <Route
          path="/create-playlist/*"
          element={
            <SecretPage>
              <CreatePlaylistModule />
            </SecretPage>
          }
        />
        <Route
          path="*"
          element={
            <main style={{padding: '1rem'}}>
              <p>Theres nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
