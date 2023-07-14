import {
  PRODUCT_DETAIL_ACTION_TYPES,
  SetLoadingAction,
  ProductDetailSuccesAction,
  ProductDetailRequestAction,
} from './productDetail.action';
import {ForkEffect, put, call, takeLatest} from 'redux-saga/effects';
import {GenericActionCreator} from 'utils';
import {getSingleProduct} from 'services';
import {AxiosResponse} from 'axios';

function* ProductDetailRequestSaga(action: ProductDetailRequestAction) {
  try {
    const productDetailData: AxiosResponse = yield call(() =>
      getSingleProduct(action.payload),
    );
    yield put(
      GenericActionCreator<ProductDetailSuccesAction>({
        type: PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_SUCCESS,
        payload: productDetailData.data,
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

export default function* ProductDetailModuleSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(
    PRODUCT_DETAIL_ACTION_TYPES.PRODUCT_DETAIL_REQUEST,
    ProductDetailRequestSaga,
  );
}
