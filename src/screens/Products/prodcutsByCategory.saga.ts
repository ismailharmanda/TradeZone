import {
  PRODUCTS_ACTION_TYPES,
  SetLoadingAction,
  ProductsByCategorySuccesAction,
  ProductsByCategoryRequestAction,
} from './products.action';
import {ForkEffect, put, call, takeLatest} from 'redux-saga/effects';
import {GenericActionCreator} from 'utils';
import {getProductsByCategory} from 'services';
import {AxiosResponse} from 'axios';

function* ProductsByCategoryRequestSaga(
  action: ProductsByCategoryRequestAction,
) {
  try {
    const productsByCategoryData: AxiosResponse = yield call(() =>
      getProductsByCategory(action.payload),
    );
    yield put(
      GenericActionCreator<ProductsByCategorySuccesAction>({
        type: PRODUCTS_ACTION_TYPES.PRODUCTS_BY_CATEGORY_SUCCESS,
        payload: {
          category: action.payload,
          products: productsByCategoryData.data,
        },
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

export default function* ProductsByCategoryModuleSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(
    PRODUCTS_ACTION_TYPES.PRODUCTS_BY_CATEGORY_REQUEST,
    ProductsByCategoryRequestSaga,
  );
}
