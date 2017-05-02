import { callApi,
        setIdToken,
        removeIdToken,
       } from '../utils/apiUtils';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

function signupRequest(user) {
  return {
    type: SIGNUP_REQUEST,
    user,
  };
}

function signupSuccess(response) {
  const idToken = response.data.auth_token;
  const user = response.data.user;
  idToken && setIdToken(idToken);
  return {
    type: SIGNUP_SUCCESS,
    user: user,
  };
}

function signupFailure(error) {
  removeIdToken();
  return {
    type: SIGNUP_FAILURE,
    error: error,
  };
}

export function signup(data) {
  const config = {
    method: 'post',    
    body: JSON.stringify(data),
  };
  return callApi('/v1/sessions', {}, config, signupRequest(data.signup), signupSuccess, signupFailure);
}
