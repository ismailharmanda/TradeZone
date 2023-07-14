import {CombinedState, combineReducers, Reducer} from 'redux';
import {LoginState} from 'screens/Login/login.action';
import loginReducer from 'screens/Login/login.reducer';
import {ProductsState} from 'screens/Products/products.action';
import productsReducer from 'screens/Products/products.reducer';
import {ProductDetailState} from 'screens/ProductDetail/productDetail.action';
import productDetailReducer from 'screens/ProductDetail/productDetail.reducer';

export interface GlobalState {
  LOGIN: LoginState;
  PRODUCTS: ProductsState;
  PRODUCT_DETAIL: ProductDetailState;
}

const createRootReducer = (): Reducer<CombinedState<GlobalState>> =>
  combineReducers<GlobalState>({
    LOGIN: loginReducer,
    PRODUCTS: productsReducer,
    PRODUCT_DETAIL: productDetailReducer,
  });

export default createRootReducer;
