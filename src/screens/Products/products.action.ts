import {IProductInfo} from './products';

export enum PRODUCTS_ACTION_TYPES {
  PRODUCTS_REQUEST = 'PRODUCTS_REQUEST',
  PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS',
  PRODUCTS_FAILURE = 'PRODUCTS_FAILURE',
  SET_LOADING = 'SET_LOADING',
}

export interface ProductsState {
  loading: boolean;
  products: [IProductInfo?];
}

export interface ProductsRequestAction {
  type: PRODUCTS_ACTION_TYPES.PRODUCTS_REQUEST;
}

export interface ProductsSuccesAction {
  type: PRODUCTS_ACTION_TYPES.PRODUCTS_SUCCESS;
  payload: [IProductInfo];
}

export interface ProductsFailAction {
  type: PRODUCTS_ACTION_TYPES.PRODUCTS_FAILURE;
}

export interface SetLoadingAction {
  type: PRODUCTS_ACTION_TYPES.SET_LOADING;
  payload: boolean;
}

export type ProductsActions =
  | ProductsRequestAction
  | ProductsSuccesAction
  | ProductsFailAction
  | SetLoadingAction;
