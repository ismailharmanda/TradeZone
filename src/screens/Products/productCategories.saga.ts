import {
  PRODUCTS_ACTION_TYPES,
  SetLoadingAction,
  ProductCategoriesSuccessAction,
} from './products.action';
import {ForkEffect, put, call, takeLatest} from 'redux-saga/effects';
import {GenericActionCreator} from 'utils';
import {getCategories} from 'services';
import {AxiosResponse} from 'axios';

function* ProductsByCategoriesSaga() {
  try {
    const productCategories: AxiosResponse = yield call(getCategories);
    yield put(
      GenericActionCreator<ProductCategoriesSuccessAction>({
        type: PRODUCTS_ACTION_TYPES.PRODUCT_CATEGORIES_SUCCESS,
        payload: productCategories.data,
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

export default function* ProductCategoriesModuleSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(
    PRODUCTS_ACTION_TYPES.PRODUCT_CATEGORIES_REQUEST,
    ProductsByCategoriesSaga,
  );
}
