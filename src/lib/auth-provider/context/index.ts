import create, {SetState, GetState} from 'zustand';

import {userPersistance, tokenPersistance} from '../persistance';

import {User} from '../constants';

const [setUserPersistance, getUserPersistance, removeUserPersistance] =
  userPersistance();

const [setTokenPersistance, getTokenPersistance, removeTokenPersistance] =
  tokenPersistance();

interface AuthState {
  user: User;
  isAuth: boolean;
  token: string;
}

interface AuthActions {
  getAuth: () => AuthState;
  setToken: (payload: string) => void;
  setUser: (payload: User) => void;
  clearSession: () => void;
}

interface authContext extends AuthState, AuthActions {}

const stateDefault: AuthState = {
  user: {
    id: '',
    display_name: '',
    country: '',
    email: '',
    avatar: '',
    products: '',
    type: '',
    uri: '',
  },
  token: '',
  isAuth: false,
};

const actions = (
  set: SetState<AuthState>,
  get: GetState<AuthState>,
): AuthActions => ({
  getAuth: () => {
    const currentState = get();
    let authState: AuthState = {...currentState};

    if (!currentState.isAuth) {
      const userProfile = getUserPersistance();
      const userToken = getTokenPersistance();

      if (userToken) {
        authState = {
          ...authState,
          token: userToken,
          isAuth: true,
        };
      }

      if (userProfile) {
        authState = {
          ...authState,
          user: {...userProfile},
        };
      }
    }

    set(state => ({
      ...state,
      user: {...authState.user},
      token: authState.token,
      isAuth: authState.isAuth,
    }));

    return authState;
  },

  setToken: (payload: string) => {
    setTokenPersistance(payload);

    set(state => ({
      ...state,
      token: payload,
      isAuth: true,
    }));
  },

  setUser: (payload: User) => {
    setUserPersistance(payload);

    set(state => ({
      ...state,
      user: {...payload},
      isAuth: true,
    }));
  },

  clearSession: () => {
    removeUserPersistance();
    removeTokenPersistance();

    set(state => ({
      ...state,
      ...stateDefault,
    }));
  },
});

export const useAuth = create<authContext>((set, get) => ({
  ...stateDefault,
  ...actions(set, get),
}));
