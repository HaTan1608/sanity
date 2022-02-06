import { all } from "redux-saga/effects";
import postSaga from "./sagas/postSaga";
import userSaga from "./sagas/userSaga";
export default function* rootSagas() {
  yield all([postSaga(), userSaga()]);
}
