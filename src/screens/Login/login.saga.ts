import {
  LOGIN_ACTION_TYPES,
  SetLoadingAction,
  LoginSuccessAction,
} from './login.action';
import {ForkEffect, put, call, takeLatest} from 'redux-saga/effects';
import {GenericActionCreator} from 'utils';
import {loginService} from 'services';
import {AxiosResponse} from 'axios';

function* LoginRequestSaga() {
  try {
    const loginData: AxiosResponse = yield call(loginService);
    yield put(
      GenericActionCreator<LoginSuccessAction>({
        type: LOGIN_ACTION_TYPES.LOGIN_SUCCESS,
        payload: loginData.data.token,
      }),
    );
  } catch (err) {
    console.log(err);
  } finally {
    yield put(
      GenericActionCreator<SetLoadingAction>({
        type: LOGIN_ACTION_TYPES.SET_LOADING,
        payload: false,
      }),
    );
  }
}

export default function* LoginModuleSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(LOGIN_ACTION_TYPES.LOGIN_REQUEST, LoginRequestSaga);
}
