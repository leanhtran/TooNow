import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import { NavigationActions } from 'react-navigation';
import I18n from "../I18n"
import NotificationActions from '../Redux/NotificationRedux'
import LoadingActions from '../Redux/LoadingRedux'
import Toast from '../Components/Toast'

export function* getNotificationsSaga(api, action) {
  try {
    let { payload, callback } = action
    yield put(LoadingActions.showLoading())
    const response = yield call(api.getNotifications, payload)
    if (response.ok) {
      const items = path(['data', 'data'], response)
      yield put(LoadingActions.hideLoading())
      yield put(NotificationActions.getNotificationSuccess(items))
      callback && callback(items)
    } else {
      yield put(LoadingActions.hideLoading())
      yield put(LoadingActions.showError(response))
    }
  } catch (error) {
    yield put(LoadingActions.hideLoading())
    Toast(I18n.t('messageError'), 'error');
  }
}