import reducer from '../src/store/reducers/auth';

import * as actionTypes from '../src/store/actions/actionTypes';

describe('auth reducer', () => {
  test('return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isLoggedin: false,
      loading: false,
      error: null,
      token: null,
      userId: null,
      authRedirectPath: '/'
    });
  });

  test('store the toekn upon login', () => {
    expect(
      reducer(
        {
          isLoggedin: false,
          loading: false,
          error: null,
          token: null,
          userId: null,
          authRedirectPath: '/'
        },
        { type: actionTypes.AUTH_SUCCESS, loginData: {} }
      )
    ).toEqual({
      isLoggedin: true,
      expirationTime: undefined,
      data: {},
      loading: false,
      error: null,
      token: undefined,
      userId: undefined,
      authRedirectPath: '/'
    });
  });
});
