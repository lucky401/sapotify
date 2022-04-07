import { useLogin } from '../../hooks/auth';

import './index.css';

function Login() {
  const [login] = useLogin();
  return (
    <div className="auth-container">
      <h1 className="text-center">Spotify Playlist Creator</h1>
      <button
        type="button"
        onClick={login}
        className="btn btn-spotify btn-login-spotify mx-auto"
      >
        Login to Spotify
      </button>
    </div>
  );
}

export default Login;
