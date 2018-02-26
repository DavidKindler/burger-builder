import * as actionTypes from './actionTypes';
import axios from 'axios';
import { delay } from 'redux-saga';

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
  // localStorage.removeItem('loginData');
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  // return dispatch => {
  //   setTimeout(() => {
  //     dispatch(logout());
  //   }, expirationTime * 1000);
  // };
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: 10
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
  return (dispatch, getState) => {
    if (!localStorage['loginData']) {
      dispatch(logout());
    } else {
      const currentTime = new Date();
      const localStore = JSON.parse(localStorage.getItem('loginData'));
      const expirationTime = new Date(localStore.expirationTime);
      const idToken = localStore.idToken;
      const userId = localStore.localId;
      const loginData = getState();
      console.log('localStore', localStore);
      console.log('current time', new Date(currentTime));
      console.log('storage time', new Date(expirationTime));
      if (expirationTime > currentTime) {
        console.log('you should still be logged in');
        // return false;

        console.log('current state', loginData, localStorage);
        const dispatchData = {
          ...loginData.auth,
          idToken: idToken,
          isLoggedin: true,
          expirationTime: expirationTime,
          userId: userId,
          localStore: localStore
        };
        dispatch(authSuccess(dispatchData));
        console.log('dispatch authSuccess with ', dispatchData);
        var secondsLeft = (expirationTime.getTime() - new Date().getTime()) / 1000;
        dispatch(checkAuthTimeout(secondsLeft));
        console.log('expirationTime.getSeconds()', expirationTime.getTime());
        console.log('new Date().getSeconds()', new Date().getTime());
        console.log('seconds left is', secondsLeft);
      } else {
        console.log('first time logging in?');
        // dispatch('not logged in yet');
        dispatch(logout());
      }
    }
  };
};
