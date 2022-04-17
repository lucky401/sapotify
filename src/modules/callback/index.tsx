import {useEffect} from 'react';

import {useLogin} from 'lib/auth-provider/context/hooks';

function Modules(): JSX.Element {
  const [, loginWithSpotify] = useLogin();

  useEffect(() => {
    loginWithSpotify();
  }, [loginWithSpotify]);

  return <h1>login</h1>;
}

export default Modules;
