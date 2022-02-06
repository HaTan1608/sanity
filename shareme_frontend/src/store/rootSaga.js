import { all } from "redux-saga/effects";
import postSaga from "./sagas/postSaga";

export default function* rootSagas() {
  yield all([postSaga()]);
}
