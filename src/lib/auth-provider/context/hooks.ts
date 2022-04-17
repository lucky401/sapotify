import shallow from 'zustand/shallow';

import {useAuth} from './index';

import * as authServices from '../services';

import {useAsync} from '../../client/hooks';

type useProfile = [() => Promise<void>, string, string];

export function useProfile(): useProfile {
  const {execute, status, value, errorMessage} = useAsync<any, undefined>(
    authServices.me,
  );

  const [setUser] = useAuth(state => [state.setUser], shallow);

  async function getProfile(): Promise<void> {
    try {
      await execute();
      setUser({
        id: value.id,
        display_name: value.display_name,
        country: value.country,
        email: value.email,
        avatar: value.images[0]?.url || '',
        products: value.products,
        type: value.type,
        uri: value.uri,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  return [getProfile, status, errorMessage];
}

type useLogout = [() => void];

export function useLogout(): useLogout {
  const [clearSession] = useAuth(state => [state.clearSession], shallow);

  function logout(): void {
    clearSession();
  }

  return [logout];
}

type useLogin = [() => void, () => void];

export function useLogin(): useLogin {
  const [setToken] = useAuth(state => [state.setToken], shallow);

  function login(): void {
    authServices.login();
  }

  function loginWithSpotify(): void {
    try {
      const {token} = authServices.interceptSpotifyAuthRedirect();
      setToken(token);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      window.location.href = '/';
    }
  }

  return [login, loginWithSpotify];
}
