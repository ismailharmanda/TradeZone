import {LoginActions, LoginState, LOGIN_ACTION_TYPES} from './login.action';

const initialState: LoginState = {
  loading: false,
  isUserAuthenticaed: false,
  token: '',
};

export default (state = initialState, action: LoginActions) => {
  switch (action.type) {
    case LOGIN_ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isUserAuthenticaed: true,
        token: action.payload,
        loading: false,
      };
    case LOGIN_ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_ACTION_TYPES.LOGOUT:
      return {
        loading: false,
        isUserAuthenticaed: false,
        token: '',
      };
    case LOGIN_ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOGIN_ACTION_TYPES.PERSIST:
      return action.payload.LOGIN;

    default:
      return {
        ...state,
      };
  }
};
