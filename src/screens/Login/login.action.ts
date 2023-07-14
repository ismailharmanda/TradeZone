import {LoginInfo} from './login';

export enum LOGIN_ACTION_TYPES {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  SET_LOADING = 'SET_LOADING',
  PERSIST = 'persist/REHYDRATE',
}

export interface LoginState {
  loading: boolean;
  isUserAuthenticaed: boolean;
  token: String;
}

export interface LoginRequestAction {
  type: LOGIN_ACTION_TYPES.LOGIN_REQUEST;
  payload: LoginInfo;
}

export interface LoginSuccesAction {
  type: LOGIN_ACTION_TYPES.LOGIN_SUCCESS;
  payload: String;
}

export interface LoginFailAction {
  type: LOGIN_ACTION_TYPES.LOGIN_FAILURE;
}

export interface SetLoadingAction {
  type: LOGIN_ACTION_TYPES.SET_LOADING;
  payload: boolean;
}

export interface PersistAction {
  type: LOGIN_ACTION_TYPES.PERSIST;
  payload: {
    LOGIN: LoginState;
    [key: string]: unknown;
  };
}

export type LoginActions =
  | LoginRequestAction
  | LoginSuccesAction
  | LoginFailAction
  | SetLoadingAction
  | PersistAction;
