import { call, put, takeLatest } from "redux-saga/effects";
import { getPostData, getSearchPostData } from "./postsAPI";
import { getListPostSuccess, getSearchListPostSuccess } from "./action";

function* getListPostSaga(action) {
  try {
    const data = yield call(getPostData);
    yield put(getListPostSuccess(data));
  } catch (error) {}
}

function* getSearchListPostSaga(payload) {
  try {
    console.log(payload);
    const data = yield call(getSearchPostData, "test");
    yield put(getSearchListPostSuccess(data));
  } catch (error) {
    console.log(error);
  }
}
export default function* postSaga() {
  yield takeLatest("GET_LIST_POST", getListPostSaga);
  yield takeLatest("GET_SEARCH_LIST_POST", getSearchListPostSaga);
}
