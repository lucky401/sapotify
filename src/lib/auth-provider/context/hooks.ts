import shallow from 'zustand/shallow';
import {useDispatch} from 'react-redux';

import {setToken as setTokenRedux} from '../store/tokenSlice';

import {useAuth} from './index';

import * as authServices from '../services';

import {useAsync} from '../../client/hooks';

type useProfile = [() => Promise<void>, string, string];

export function useProfile(): useProfile {
  const {execute, status, errorMessage} = useAsync<unknown, undefined>(
    authServices.me,
  );

  const [setUser] = useAuth(state => [state.setUser], shallow);

  async function getProfile(): Promise<void> {
    try {
      const {data} = await execute();
      setUser({
        id: data.id,
        display_name: data.display_name,
        country: data.country,
        email: data.email,
        avatar: data.images[0]?.url || '',
        products: data.products,
        type: data.type,
        uri: data.uri,
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
  // to use redux token management
  const dispatch = useDispatch();

  function logout(): void {
    clearSession();
    dispatch(setTokenRedux(''));
    window.location.href = '/login';
  }

  return [logout];
}

type useLogin = [() => void, () => void];

export function useLogin(): useLogin {
  const [setToken] = useAuth(state => [state.setToken], shallow);
  // to use redux token management
  const dispatch = useDispatch();

  function login(): void {
    authServices.login();
  }

  function loginWithSpotify(): void {
    try {
      const {token} = authServices.interceptSpotifyAuthRedirect();
      setToken(token);

      // set token to redux
      dispatch(setTokenRedux(token));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      window.location.href = '/';
    }
  }

  return [login, loginWithSpotify];
}
