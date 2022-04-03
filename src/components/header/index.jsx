import authService from '../../api/services/auth';

function Header({ username }) {
  const handleUnAuthSpotify = () => {
    authService.logout();
  };

  return (
    <div className="header d-flex justify-between">
      <h1 className="text-center">Welcome {username?.split(' ')[0]}!</h1>
      <button
        onClick={handleUnAuthSpotify}
        className="btn btn-danger"
        type="button"
      >
        Disconnect from Spotify
      </button>
    </div>
  );
}

export default Header;
