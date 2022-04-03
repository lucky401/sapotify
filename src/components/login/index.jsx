import authService from '../../api/services/auth';

import './index.css';

function Login() {
  const handleAuthSpotify = () => {
    authService.login();
  };

  return (
    <div className="auth-container">
      <h1 className="text-center">Spotify Playlist Creator</h1>
      <button
        type="button"
        onClick={handleAuthSpotify}
        className="btn btn-spotify btn-login-spotify mx-auto"
      >
        Login to Spotify
      </button>
    </div>
  );
}

export default Login;
