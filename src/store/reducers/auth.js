import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedin: false,
  loading: false,
  error: null,
  token: null,
  userId: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loginData: action.loginData,
        loading: true,
        error: null
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isLoggedin: true,
        loading: false,
        data: action.loginData,
        error: null,
        token: action.loginData.idToken,
        userId: action.loginData.localId
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        isLoggedin: false,
        error: action.error
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        isLoggedin: false,
        token: null,
        loading: false,
        userId: null
      };
    default:
      return state;
  }
};

export default authReducer;
