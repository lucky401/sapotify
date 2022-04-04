import { useState, useEffect, useMemo } from 'react';
import shallow from 'zustand/shallow';

import { useUser } from '../store/user';

import authService from '../api/services/auth';
import profileService from '../api/services/profile';

import { interceptSpotifyAuthRedirect } from '../utils/OAuth';

export function useLogin() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [setToken] = useUser((state) => [state.setToken], shallow);

  useEffect(() => {
    if (status === 'resolved') {
      setTimeout(() => {
        setStatus('idle');
      }, 1000);
    }

    if (status === 'rejected') {
      setTimeout(() => {
        setStatus('idle');
      }, 10000);
    }
  }, [status]);

  const errorMessage = useMemo(() => {
    if (error) {
      if (error.response && error.response.data) {
        return error.response.data.message;
      }
      return 'Something error';
    }
    return null;
  }, [error]);

  function login() {
    setStatus('pending');
    try {
      authService.login();
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      setError(error);
    }
  }

  function interceptLoginRedirect() {
    setStatus('pending');
    try {
      const { token, type } = interceptSpotifyAuthRedirect();
      setToken({
        token: `${type} ${token}`,
      });
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      setError(error);
    }
  }

  return [login, interceptLoginRedirect, status, errorMessage];
}

export function useLogout() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [resetUser] = useUser((state) => [state.resetUser], shallow);

  useEffect(() => {
    if (status === 'resolved') {
      setTimeout(() => {
        setStatus('idle');
      }, 1000);
    }

    if (status === 'rejected') {
      setTimeout(() => {
        setStatus('idle');
      }, 10000);
    }
  }, [status]);

  const errorMessage = useMemo(() => {
    if (error) {
      if (error.response && error.response.data) {
        return error.response.data.message;
      }
      return 'Something error';
    }
    return null;
  }, [error]);

  async function logout() {
    setStatus('pending');
    try {
      authService.logout();
      resetUser();
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      setError(error);
    }
  }

  return [logout, status, errorMessage];
}

export function useProfile() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [setUser] = useUser((state) => [state.setUser], shallow);

  useEffect(() => {
    if (status === 'resolved') {
      setTimeout(() => {
        setStatus('idle');
      }, 1000);
    }

    if (status === 'rejected') {
      setTimeout(() => {
        setStatus('idle');
      }, 10000);
    }
  }, [status]);

  const errorMessage = useMemo(() => {
    if (error) {
      if (error.response && error.response.data) {
        return error.response.data.message;
      }
      return 'Something error';
    }
    return null;
  }, [error]);

  async function getProfile() {
    setStatus('pending');
    try {
      const { data } = await profileService.getCurrentUserProfile();
      setUser({
        id: data.id,
        name: data.display_name,
      });
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      setError(error);
    }
  }

  return [getProfile, status, errorMessage];
}
