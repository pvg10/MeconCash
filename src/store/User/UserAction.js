import * as types from './UserTypes';

export const setUserDetails = payload  => {
  localStorage.setItem('user', JSON.stringify(payload));
  return { type: types.SET_USER, payload };
}