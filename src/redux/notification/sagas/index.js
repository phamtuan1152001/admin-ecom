import * as Actions from "../constants"
import { put, call, takeEvery, select, takeLatest } from "redux-saga/effects";

// @service
import { apiGetListNotification } from "../services";

// @antd
import { notification } from "antd";

// @constants
import { SUCCESS } from "../../../constants";

function* fetchGetListNotification({ payload }) {
  try {
    yield put({ type: Actions.SET_LOADING_NOTIFICATION, payload: true });
    const res = yield call(apiGetListNotification, payload);
    if (res?.retCode === SUCCESS) {
      yield put({ type: Actions.SET_NOTIFICATION, payload: res?.retData });
      yield put({ type: Actions.SET_SUCCESS_NOTIFICATION, payload: res?.retText });
    } else {
      yield put({ type: Actions.SET_FAIL_NOTIFICATION, payload: res?.retText });
    }
  } catch (err) {
    console.log("ERROR!", err);
    yield put({ type: Actions.SET_FAIL_NOTIFICATION, payload: err?.message });
  } finally {
    yield put({ type: Actions.SET_LOADING_NOTIFICATION, payload: false });
  }
}

export default function* cartSaga() {
  // yield takeEvery(Actions.CREATE_CART, fetchCreateCart);
  // yield takeEvery(Actions.DELETE_CART, fetchDeleteCart);
  yield takeLatest(Actions.GET_LIST_NOTIFICATION, fetchGetListNotification);
}
