import axios from 'axios';

import { useTokenPersistance } from '../persistance/user';

const API_BASE_URL = process.env.REACT_APP_SPOTIFY_API_BASE_URL;

function createResource() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const [_, getToken] = useTokenPersistance();
      const token = getToken();

      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
}

export default createResource();
