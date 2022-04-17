import shallow from 'zustand/shallow';

import {useUser} from '../../store/user';

import {useLogout} from '../../hooks/auth';

function Header() {
  const [logout, status, errorMessage] = useLogout();
  const [user] = useUser(state => [state.user], shallow);

  return (
    <div className="header d-flex justify-between">
      <h1 className="text-center">Welcome {user?.name?.split(' ')[0]}!</h1>
      <button onClick={logout} className="btn btn-danger" type="button">
        Disconnect from Spotify
      </button>
    </div>
  );
}

export default Header;
