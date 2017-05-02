import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../actions/auth';

const initialState = {
   signupError: null,
   signingIn: false,
};

function initializeState(){
  return Object.assign({}, initialState);
}

export default function auth(state = initializeState(), action = {}) {
  switch (action.type) {
  case SIGNUP_REQUEST:
    return Object.assign({}, state, {signingIn: true});
  case SIGNUP_SUCCESS:
    return Object.assign({}, state, {
      signingIn: false,
      user: action.user,
    });
  case SIGNUP_FAILURE:
    return {
      ...state,
      signingIn: false,
      user: null,
      signupError: action.error
    };

  default:
    return state;
  }
}
