import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = loginData => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = loginData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    loginData: loginData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};
export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = loginData => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      ...loginData,
      returnSecureToken: true
    };
    let url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDAYybqu9fwt_5bSp14Seg3qjDSfrgj0Os';
    if (!authData.isSignup) {
      url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDAYybqu9fwt_5bSp14Seg3qjDSfrgj0Os';
    }
    axios
      .post(url, authData)
      .then(response => {
        const expirationTime = new Date().getTime() * 1000;
        const localData = { ...response.data, expirationTime };
        localStorage.setItem('loginData', JSON.stringify(localData));
        console.log(JSON.parse(localStorage.getItem('loginData')));
        // dispatch(authSuccess(response.data));
        // dispatch(checkAuthTimeout(response.data.expiresIn));
        dispatch(authSuccess(localData));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path: path
  };
};
