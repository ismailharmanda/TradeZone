import {ProductDetail} from './productDetail';

export enum PRODUCT_DETAIL_ACTION_TYPES {
  PRODUCT_DETAIL_REQUEST = 'PRODUCT_DETAIL_REQUEST',
  PRODUCT_DETAIL_SUCCESS = 'PRODUCT_DETAIL_SUCCESS',
  PRODUCT_DETAIL_FAILURE = 'PRODUCT_DETAIL_FAILURE',
  SET_LOADING = 'SET_LOADING',
}

export interface ProductDetailState {
  loading: boolean;
  product: ProductDetail | undefined;
}

export interface ProductDetailRequestAction {
  type: PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_REQUEST;
  payload: number;
}

export interface ProductDetailSuccessAction {
  type: PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_SUCCESS;
  payload: ProductDetail;
}

export interface ProductDetailFailAction {
  type: PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_FAILURE;
}

export interface SetLoadingAction {
  type: PRODUCT_DETAIL_ACTION_TYPES.SET_LOADING;
  payload: boolean;
}

export type ProductDetailActions =
  | ProductDetailRequestAction
  | ProductDetailSuccessAction
  | ProductDetailFailAction
  | SetLoadingAction;
