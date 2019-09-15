import authTypes from "./types";
import AuthService from "./service";

/* Sync Action Creators */

export const startLogin = creds => ({type: authTypes.LOGIN_REQUEST, payload: creds});

export const loginSuccess = user => ({type: authTypes.LOGIN_SUCCESS, payload: user});

export const loginError = error => ({type: authTypes.LOGIN_FAILURE, payload: error});

export const setUser = user => {
  return {
    type: authTypes.SET_USER,
    payload: user
  };
};

/* Async Action Creators */

export const requestLogin = user => dispatch => {
  dispatch(startLogin);
  return AuthService.login(user).then(response => {
    response.user
      ? dispatch(loginSuccess(response))
      : dispatch(loginError(response));
  })

};
