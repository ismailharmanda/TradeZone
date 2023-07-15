import {LoginInfo} from './login';

export enum LOGIN_ACTION_TYPES {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
  SET_LOADING = 'SET_LOADING',
  PERSIST = 'persist/REHYDRATE',
}

export interface LoginState {
  loading: boolean;
  isUserAuthenticaed: boolean;
  token: string;
}

export interface LoginRequestAction {
  type: LOGIN_ACTION_TYPES.LOGIN_REQUEST;
  payload: LoginInfo;
}

export interface LoginSuccesAction {
  type: LOGIN_ACTION_TYPES.LOGIN_SUCCESS;
  payload: string;
}

export interface LoginFailAction {
  type: LOGIN_ACTION_TYPES.LOGIN_FAILURE;
}

export interface LogoutAction {
  type: LOGIN_ACTION_TYPES.LOGOUT;
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
  | LogoutAction
  | SetLoadingAction
  | PersistAction;
