import { call, put, takeLatest } from "redux-saga/effects";
import { userLoginSuccess, userLogout } from "../actions/userActions";
import { signIn } from "../api/postsAPI";

function* userLoginSaga({ payload }) {
  try {
    const data = yield call(signIn, payload);
    yield put(userLoginSuccess(data));
  } catch (error) {}
}
export default function* postSaga() {
  yield takeLatest("USER_LOG_IN", userLoginSaga);
}
