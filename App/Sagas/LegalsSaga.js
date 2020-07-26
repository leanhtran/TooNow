import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import I18n from "../I18n"
import LegalsActions from '../Redux/LegalsRedux'
import LoadingActions from '../Redux/LoadingRedux'
import Toast from '../Components/Toast'

export function* getLegalsSaga(api, action) {
  try {
    yield put(LoadingActions.showLoading())
    const response = yield call(api.getLegals)
    if (response.ok) {
      const items = path(['data', 'data'], response)
      yield put(LoadingActions.hideLoading())
      yield put(LegalsActions.getLegalsSuccess(items))
    } else {
      yield put(LoadingActions.hideLoading())
      yield put(LoadingActions.showError(response))
    }
  } catch (error) {
    yield put(LoadingActions.hideLoading())
    Toast(I18n.t('messageError'), 'error');
  }
}

export function* getCompanyInfoSaga(api, action) {
  try {
    let { payload, callback } = action;
    yield put(LoadingActions.showLoading())
    const response = yield call(api.getCompanyInformation, payload)
    if (response.ok) {
      const items = path(['data', 'data'], response)
      yield put(LoadingActions.hideLoading())
      yield put(LegalsActions.getCompanyInformationSuccess(items))
      callback && callback()
    } else {
      yield put(LoadingActions.hideLoading())
      yield put(LoadingActions.showError(response))
    }
  } catch (error) {
    yield put(LoadingActions.hideLoading())
    Toast(I18n.t('messageError'), 'error');
  }
}