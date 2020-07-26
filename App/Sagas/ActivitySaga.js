import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import { NavigationActions } from 'react-navigation';
import I18n from "../I18n"
import ActivityActions from '../Redux/ActivityRedux'
import LoadingActions from '../Redux/LoadingRedux'
import Toast from '../Components/Toast'

export function* getActivitiesOnlineSaga(api, action) {
  try {
    yield put(LoadingActions.showLoading())
    const response = yield call(api.getActivitiesOnline)
    if (response.ok) {
      const items = path(['data', 'data'], response)
      yield put(LoadingActions.hideLoading())
      yield put(ActivityActions.getActivitiesOnlineSuccess(items))
    } else {
      yield put(LoadingActions.hideLoading())
      yield put(LoadingActions.showError(response))
    }
  } catch (error) {
    console.log('error', error)
    yield put(LoadingActions.hideLoading())
    Toast(I18n.t('messageError'), 'error');
  }
}

export function* getActivitiesOfflineSaga(api, action) {
    try {
      yield put(LoadingActions.showLoading())
      const response = yield call(api.getActivitiesOffline)
      if (response.ok) {
        const items = path(['data', 'data'], response)
        yield put(LoadingActions.hideLoading())
        yield put(ActivityActions.getActivitiesOfflineSuccess(items))
      } else {
        yield put(LoadingActions.hideLoading())
        yield put(LoadingActions.showError(response))
      }
    } catch (error) {
      yield put(LoadingActions.hideLoading())
      Toast(I18n.t('messageError'), 'error');
    }
  }