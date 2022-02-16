import { call, put, takeLatest } from "redux-saga/effects";
import {
  comment,
  createPost,
  deletePost,
  fetchPost,
  fetchPosts,
  fetchPostsByCreator,
  fetchPostsBySearch,
  updatePost,
} from "../api/postsAPI";
import {
  addCommentSuccess,
  createPostSuccess,
  deletePostSuccess,
  getListPostSuccess,
  getPostByCreatorSuccess,
  getPostByIdSuccess,
  getSearchListPostSuccess,
  updatePostSuccess,
} from "../actions/postActions";

function* getListPostSaga(payload) {
  try {
    console.log(payload)
    const data = yield call(fetchPosts,payload?.category,payload?.page);
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
function* getPostByCreatorSaga({ payload }) {
  try {
    console.log(payload)
    const data = yield call(fetchPostsByCreator, payload);
    yield put(getPostByCreatorSuccess(data));
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
function* createPostSaga({ payload, navigate }) {
  try {
    const data = yield call(createPost, payload);
    yield put(createPostSuccess(data));
    navigate(`/pin-detail/${data?.data._id}`);
  } catch (error) {
    console.log(error);
  }
}

function* updatePostSaga({ navigate, pinId, payload }) {
  try {
    const data = yield call(updatePost, pinId, payload);
    yield put(updatePostSuccess(data));
    navigate(`/pin-detail/${pinId}`);
  } catch (error) {
    console.log(error);
  }
}
function* deletePostSaga({ pinId, navigate }) {
  try {
    const data = yield call(deletePost, pinId);
    yield put(deletePostSuccess(data));
    navigate(`/`);
  } catch (error) {
    console.log(error);
  }
}
function* addCommentSaga({ pinId, payload }) {
  try {
    const data = yield call(comment, pinId, payload);
    yield put(addCommentSuccess(data));
  } catch (error) {
    console.log(error);
  }
}
export default function* postSaga() {
  yield takeLatest("GET_LIST_POST", getListPostSaga);
  yield takeLatest("GET_SEARCH_LIST_POST", getSearchListPostSaga);
  yield takeLatest("GET_POST_BY_CREATOR", getPostByCreatorSaga);

  yield takeLatest("GET_POST_BY_ID", getPostByIdSaga);
  yield takeLatest("CREATE_POST", createPostSaga);
  yield takeLatest("UPDATE_POST", updatePostSaga);
  yield takeLatest("DELETE_POST", deletePostSaga);
  yield takeLatest("ADD_COMMENT", addCommentSaga);
}
