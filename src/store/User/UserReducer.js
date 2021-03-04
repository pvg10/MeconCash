import * as types from "./UserTypes";

const INITIAL_STATE =
  (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : {}) || {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        user: action.payload,
      };
    default:
      return { user: state };
  }
};
