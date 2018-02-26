import { put } from 'redux-saga/effects';
// import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
import { delay } from 'redux-saga';

export function* logoutSaga(action) {
  yield localStorage.removeItem('loginData');
  yield put(actions.logoutSucceed);
  // yield put({
  //   type: actionTypes.AUTH_LOGOUT
  // });
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}
