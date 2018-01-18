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
  localStorage.removeItem('loginData');
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
    // checkStillLoggedIn();
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
        const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
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

export const authCheckState = loginData => {
  return dispatch => {
    if (!localStorage['loginData']) {
      dispatch(logout());
    } else {
      const currentTime = new Date();
      const localStore = JSON.parse(localStorage.getItem('loginData'));
      const expirationTime = new Date(localStore.expirationTime);
      // const token = localStore.token;
      console.log('localStorage', localStore);
      console.log('current time', new Date(currentTime));
      console.log('storage time', new Date(expirationTime));
      if (expirationTime > currentTime) {
        console.log('you should still be logged in');
        // return false;
        const dispatchData = {
          ...loginData,
          // token: localStorage.token,
          expirationTime: localStorage.expirationTime,
          data: localStorage
        };
        dispatch(authSuccess(dispatchData));
        console.log('dispatch authSuccess with ', dispatchData);
        dispatch(checkAuthTimeout(expirationTime.getSeconds() - new Date().getSeconds()));
      } else {
        console.log('first time logging in?');
        // dispatch('not logged in yet');
        dispatch(logout());
      }
    }
  };
};
