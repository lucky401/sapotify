import * as storage from '../utils/storage';

const ENV = process.env.NODE_ENV || 'development';

export function useTokenPersistance() {
  const KEY = `${ENV}_sapotify_token`;

  function set(token) {
    storage.setStorage(KEY, token);
  }

  function get() {
    const value = storage.getStorage(KEY);
    return value;
  }

  function remove() {
    const value = storage.removeItemStorage(KEY);
    return value;
  }

  return [set, get, remove];
}
