/* eslint-disable react-hooks/rules-of-hooks */
import create from 'zustand';

import { useTokenPersistance } from '../persistance/user';

const [setTokenPersistance, getTokenPersistance, removeTokenPersistance] =
  useTokenPersistance();

const stateDefault = {
  user: {
    id: null,
    name: null,
    token: null,
  },
  logged: false,
};

const actions = (set, get) => ({
  getUser: () => {
    const userFromState = get().user;
    let user = userFromState;

    if (!user.token) {
      const userToken = getTokenPersistance();

      user = {
        ...user,
        token: userToken,
      };
    }

    set((state) => ({
      ...state,
      user: {
        ...user,
      },
      logged: !!user.token,
    }));

    return user;
  },

  setToken: (payload) => {
    setTokenPersistance(payload.token.replace('Bearer ', ''));

    set((state) => ({
      ...state,
      user: {
        ...state.user,
        token: payload.token,
      },
      logged: true,
    }));
  },

  setUser: (payload) => {
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        ...payload,
      },
    }));
  },

  resetUser: async () => {
    await removeTokenPersistance();

    set((state) => ({
      ...state,
      ...stateDefault,
    }));
  },
});

export const useUser = create((set, get) => ({
  ...stateDefault,
  ...actions(set, get),
}));
