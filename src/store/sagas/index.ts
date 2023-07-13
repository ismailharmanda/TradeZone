import LoginModuleSaga from 'screens/Login/login.saga';
import ProductsModuleSaga from 'screens/Products/products.saga';
import {all, fork, take} from 'redux-saga/effects';
import {REHYDRATE} from 'redux-persist/lib/constants';

export default function* rootSaga(): Generator {
  yield take(REHYDRATE);
  yield all([fork(LoginModuleSaga), fork(ProductsModuleSaga)]);
}
