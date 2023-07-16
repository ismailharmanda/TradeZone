import {CartProduct} from './cart';
import {Product} from 'screens/Products/products';

export enum CART_ACTION_TYPES {
  CART_ADD = 'CART_ADD',
  CART_BUY = 'CART_BUY',
  CART_DELETE_SINGLE = 'CART_DELETE_SINGLE',
  CART_DELETE_ALL = 'CART_DELETE_ALL',
  SET_LOADING = 'SET_LOADING',
}

export interface CartState {
  loading: boolean;
  items: CartProduct[] | [];
  totalAmount: number;
  summary: number;
  totalDiscount: number;
  totalByCategory: {
    [key: string]: {
      total: number;
      summary: number;
      discountAmount: number;
      percentage: number;
    };
  };
  discountedCategories: {
    [key: string]: {minTotal: number; discount: number};
  };
}

export interface CartAddAction {
  type: CART_ACTION_TYPES.CART_ADD;
  payload: Product;
}

export interface CartBuyAction {
  type: CART_ACTION_TYPES.CART_BUY;
}

export interface CartDeleteSingleAction {
  type: CART_ACTION_TYPES.CART_DELETE_SINGLE;
  payload: Product;
}

export interface CartDeleteAllAction {
  type: CART_ACTION_TYPES.CART_DELETE_ALL;
  payload: Product;
}

export interface SetLoadingAction {
  type: CART_ACTION_TYPES.SET_LOADING;
  payload: boolean;
}

export type CartActions =
  | CartAddAction
  | CartBuyAction
  | CartDeleteSingleAction
  | CartDeleteAllAction
  | SetLoadingAction;
