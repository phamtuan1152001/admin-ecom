import { all, fork } from "redux-saga/effects";

import notificationSaga from "./notification/sagas"

export function* rootSagas() {
  yield all([notificationSaga()])
}