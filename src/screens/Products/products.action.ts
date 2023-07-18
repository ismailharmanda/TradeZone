import {Product, Categories, ProductsByCategories} from './products';

export enum PRODUCTS_ACTION_TYPES {
  PRODUCTS_REQUEST = 'PRODUCTS_REQUEST',
  PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS',
  PRODUCTS_FAILURE = 'PRODUCTS_FAILURE',
  PRODUCT_CATEGORIES_REQUEST = 'PRODUCT_CATEGORIES_REQUEST',
  PRODUCT_CATEGORIES_SUCCESS = 'PRODUCT_CATEGORIES_SUCCESS',
  PRODUCT_CATEGORIES_FAILURE = 'PRODUCT_CATEGORIES_FAILURE',
  PRODUCTS_BY_CATEGORY_REQUEST = 'PRODUCTS_BY_CATEGORY_REQUEST',
  PRODUCTS_BY_CATEGORY_SUCCESS = 'PRODUCTS_BY_CATEGORY_SUCCESS',
  PRODUCTS_BY_CATEGORY_FAILURE = 'PRODUCTS_BY_CATEGORY_FAILURE',
  SET_LOADING = 'SET_LOADING',
}

export interface ProductsState {
  loading: boolean;
  products: Product[];
  categories: string[];
  productsByCategories: ProductsByCategories;
}

export interface ProductsRequestAction {
  type: PRODUCTS_ACTION_TYPES.PRODUCTS_REQUEST;
}

export interface ProductsSuccessAction {
  type: PRODUCTS_ACTION_TYPES.PRODUCTS_SUCCESS;
  payload: Product[];
}

export interface ProductsFailAction {
  type: PRODUCTS_ACTION_TYPES.PRODUCTS_FAILURE;
}

export interface SetLoadingAction {
  type: PRODUCTS_ACTION_TYPES.SET_LOADING;
  payload: boolean;
}

export interface ProductCategoriesRequestAction {
  type: PRODUCTS_ACTION_TYPES.PRODUCT_CATEGORIES_REQUEST;
}

export interface ProductCategoriesSuccessAction {
  type: PRODUCTS_ACTION_TYPES.PRODUCT_CATEGORIES_SUCCESS;
  payload: Categories;
}

export interface ProductCategoriesFailAction {
  type: PRODUCTS_ACTION_TYPES.PRODUCT_CATEGORIES_FAILURE;
}

export interface ProductsByCategoryRequestAction {
  type: PRODUCTS_ACTION_TYPES.PRODUCTS_BY_CATEGORY_REQUEST;
  payload: string;
}

export interface ProductsByCategorySuccessAction {
  type: PRODUCTS_ACTION_TYPES.PRODUCTS_BY_CATEGORY_SUCCESS;
  payload: {category: string; products: Product[]};
}

export interface ProductsByCategoryFailAction {
  type: PRODUCTS_ACTION_TYPES.PRODUCTS_BY_CATEGORY_FAILURE;
}

export type ProductsActions =
  | ProductsRequestAction
  | ProductsSuccessAction
  | ProductsFailAction
  | SetLoadingAction
  | ProductCategoriesRequestAction
  | ProductCategoriesSuccessAction
  | ProductCategoriesFailAction
  | ProductsByCategoryRequestAction
  | ProductsByCategorySuccessAction
  | ProductsByCategoryFailAction;
