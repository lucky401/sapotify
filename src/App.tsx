import {Suspense, lazy, useEffect} from 'react';
import shallow from 'zustand/shallow';
import {useLocation, useNavigate, Routes, Route} from 'react-router-dom';

import {useProfile} from 'lib/auth-provider/context/hooks';
import {FullPageSpinner} from './common/components/full-page-spinner';

import {useAuth} from './lib/auth-provider/context';

const LoginModule = lazy(() => import('./modules/login'));
const CallbackLoginModule = lazy(() => import('./modules/callback'));
const CreatePlaylistModule = lazy(() => import('./modules/create-playlist'));

function SecretPage({children}: {children: JSX.Element}): JSX.Element {
  const navigate = useNavigate();
  const [getAuth] = useAuth(state => [state.getAuth], shallow);

  useEffect(() => {
    const currentUser = getAuth();
    if (!currentUser.token) {
      navigate('/login');
    }
  }, [getAuth, navigate]);

  return children;
}

function App(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [getAuth] = useAuth(state => [state.getAuth], shallow);
  const [getProfile] = useProfile();

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
