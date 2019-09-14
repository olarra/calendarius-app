import authTypes from "./types";
import AuthService from "./service";

/* Sync Action Creators */

export const startLogin = creds => ({
  type: authTypes.LOGIN_REQUEST,
  payload: creds
});

export const loginSuccess = user => ({
  type: authTypes.LOGIN_SUCCESS,
  payload: user
});

export const loginError = error => ({
  type: authTypes.LOGIN_FAILURE,
  payload: error
});

/* Async Action Creators */

export const requestLogin = user => dispatch => {
  dispatch(startLogin);
  AuthService.login(user)
    .then(response => console.log("Response =>", response))
    .catch(error => console.log("Error =>", error));
};
