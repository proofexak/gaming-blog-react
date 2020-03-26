import { combineReducers, createStore } from 'redux';

export const setToken = token => ({
  type: 'SET_TOKEN',
  token,
});

export const clearToken = () => ({
  type: 'CLEAR_TOKEN',
});

export const token = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'CLEAR_TOKEN':
      return null;
    default:
      return state;
  }
};

export const reducers = combineReducers({ token });

export function configureStore(initialState = { token: localStorage.getItem('authorization_token') }) {
  const store = createStore(reducers, initialState);
  return store;
};

export const store = configureStore();
