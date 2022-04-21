import * as storage from 'lib/storage';
import {base64Encode, base64Decode} from 'lib/security';

import {TOKEN_STORAGE_KEY, USER_STORAGE_KEY, User} from '../constants';

type userPersistance = [(payload: User) => void, () => User, () => void];
type tokenPersistance = [(token: string) => void, () => string, () => void];

export function userPersistance(): userPersistance {
  function set(payload: User): void {
    return storage.setStorage(USER_STORAGE_KEY, payload);
  }

  function get(): User {
    return storage.getStorage(USER_STORAGE_KEY);
  }

  function remove(): void {
    storage.removeItemStorage(USER_STORAGE_KEY);
  }

  return [set, get, remove];
}

export function tokenPersistance(): tokenPersistance {
  function set(token: string): void {
    return storage.setStorage(TOKEN_STORAGE_KEY, base64Encode(token));
  }

  function get(): string {
    return base64Decode(storage.getStorage(TOKEN_STORAGE_KEY));
  }

  function remove(): void {
    storage.removeItemStorage(TOKEN_STORAGE_KEY);
  }

  return [set, get, remove];
}
