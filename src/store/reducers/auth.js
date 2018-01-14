import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedin: false,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true };
    case actionTypes.AUTH_SUCCESS:
      return { ...state, isLoggedin: true };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        isLoggedin: false
      };
    default:
      return state;
  }
};

export default authReducer;
