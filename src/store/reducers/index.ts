import {CombinedState, combineReducers, Reducer} from 'redux';
import {LoginState} from 'screens/Login/login.action';
import loginReducer from 'screens/Login/login.reducer';
import {ProductsState} from 'screens/Products/products.action';
import productsReducer from 'screens/Products/products.reducer';

export interface GlobalState {
  LOGIN: LoginState;
  PRODUCTS: ProductsState;
}

const createRootReducer = (): Reducer<CombinedState<GlobalState>> =>
  combineReducers<GlobalState>({
    LOGIN: loginReducer,
    PRODUCTS: productsReducer,
  });

export default createRootReducer;
