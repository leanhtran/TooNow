import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import I18n from "../I18n"
import UploadImageActions from '../Redux/UploadImageRedux'
import LoadingActions from '../Redux/LoadingRedux'
import Toast from '../Components/Toast'

export function* uploadImageSaga(api, action) {
    let { payload } = action
    try {        
        yield put(LoadingActions.showLoading())
        const response = yield call(api.uploadImages, payload)
        if (response.ok) {
            const items = path(['data', 'data'], response);
            yield put(LoadingActions.hideLoading())
            yield put(UploadImageActions.uploadImageSuccess(items))
        } else {
            yield put(LoadingActions.hideLoading())
            yield put(LoadingActions.showError(response))
        }
    } catch (error) {
        yield put(LoadingActions.hideLoading())
        Toast(I18n.t('messageError'), 'error');
    }
}