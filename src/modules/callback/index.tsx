import {useEffect} from 'react';

import {useLogin} from 'lib/auth-provider/context/hooks';
import {FullPageSpinner} from 'common/components/full-page-spinner';

function Modules(): JSX.Element {
  const [, loginWithSpotify] = useLogin();

  useEffect(() => {
    loginWithSpotify();
  }, [loginWithSpotify]);

  return <FullPageSpinner />;
}

export default Modules;
