import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import I18n from "../I18n"
import HistoryMissionsActions from '../Redux/GetHistoryMissionsRedux'
import LoadingActions from '../Redux/LoadingRedux'
import Toast from '../Components/Toast'

export function* getHistoryMissionsSaga(api, action) {
    let payload = action.payload.date
    try {
        yield put(LoadingActions.showLoading())
        const response = yield call(api.getHistoryMissions, payload)
        if (response.ok) {
            const items = path(['data', 'data'], response);
            yield put(LoadingActions.hideLoading())
            yield put(HistoryMissionsActions.getHistoryMissionsSuccess(items))
        } else {
            yield put(LoadingActions.hideLoading())
            yield put(LoadingActions.showError(response))
        }
    } catch (error) {
        yield put(LoadingActions.hideLoading())
        Toast(I18n.t('messageError'), 'error');
    }
}