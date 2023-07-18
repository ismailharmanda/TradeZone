import {
  PRODUCTS_ACTION_TYPES,
  SetLoadingAction,
  ProductsSuccessAction,
} from './products.action';
import {ForkEffect, put, call, takeLatest} from 'redux-saga/effects';
import {GenericActionCreator} from 'utils';
import {getAllProducts} from 'services';
import {AxiosResponse} from 'axios';

function* ProductsRequestSaga() {
  try {
    const productsData: AxiosResponse = yield call(getAllProducts);
    yield put(
      GenericActionCreator<ProductsSuccessAction>({
        type: PRODUCTS_ACTION_TYPES.PRODUCTS_SUCCESS,
        payload: productsData.data,
      }),
    );
  } catch (err) {
    console.error(err);
  } finally {
    yield put(
      GenericActionCreator<SetLoadingAction>({
        type: PRODUCTS_ACTION_TYPES.SET_LOADING,
        payload: false,
      }),
    );
  }
}

export default function* ProductsModuleSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(PRODUCTS_ACTION_TYPES.PRODUCTS_REQUEST, ProductsRequestSaga);
}
