import { all } from "redux-saga/effects";
import postSaga from "./postSaga";

export default function* rootSagas() {
  yield all([postSaga()]);
}
