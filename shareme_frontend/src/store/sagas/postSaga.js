import { call, put, takeLatest } from "redux-saga/effects";
import { fetchPost, fetchPosts, fetchPostsBySearch } from "../api/postsAPI";
import {
  getListPostSuccess,
  getPostByIdSuccess,
  getSearchListPostSuccess,
} from "../actions/postActions";

function* getListPostSaga(action) {
  try {
    const data = yield call(fetchPosts);
    yield put(getListPostSuccess(data));
  } catch (error) {}
}

function* getSearchListPostSaga({ payload }) {
  try {
    const data = yield call(fetchPostsBySearch, payload);
    yield put(getSearchListPostSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

function* getPostByIdSaga({ payload }) {
  try {
    const data = yield call(fetchPost, payload);
    yield put(getPostByIdSuccess(data));
  } catch (error) {
    console.log(error);
  }
}
export default function* postSaga() {
  yield takeLatest("GET_LIST_POST", getListPostSaga);
  yield takeLatest("GET_SEARCH_LIST_POST", getSearchListPostSaga);
  yield takeLatest("GET_POST_BY_ID", getPostByIdSaga);
}
