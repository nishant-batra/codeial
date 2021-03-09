import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_START } from "../actions/actionType";

const initialState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false,
};
export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START: {
      return {
        ...state,
        inProgress: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        inProgress: false,
        isLoggedIn: true,
        error: null,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        inProgress: false,
        error: action.error,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
}
