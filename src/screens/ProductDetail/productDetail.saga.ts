import {
  PRODUCT_DETAIL_ACTION_TYPES,
  SetLoadingAction,
  ProductDetailSuccesAction,
} from './productDetail.action';
import {ForkEffect, put, call, takeLatest} from 'redux-saga/effects';
import {GenericActionCreator} from 'utils';
import {getAllProducts} from 'services';
import {AxiosResponse} from 'axios';

function* ProductDetailRequestSaga() {
  try {
    const productsData: AxiosResponse = yield call(getAllProducts);
    yield put(
      GenericActionCreator<ProductDetailSuccesAction>({
        type: PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_SUCCESS,
        payload: productsData.data,
      }),
    );
  } catch (err) {
    console.error(err);
  } finally {
    yield put(
      GenericActionCreator<SetLoadingAction>({
        type: PRODUCT_DETAIL_ACTION_TYPES.SET_LOADING,
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
  yield takeLatest(
    PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_REQUEST,
    ProductDetailRequestSaga,
  );
}
