import { call, put, takeLatest } from "redux-saga/effects";
import { userLoginSuccess, userSignUpSuccess } from "../actions/userActions";
import { signIn, signUp } from "../api/postsAPI";

function* userLoginSaga({ payload }) {
  try {
    const data = yield call(signIn, payload.form);
    yield put(userLoginSuccess(data));
    
    payload.history(payload.location);
  } catch (error) {}
}

function* userSignUpSaga({ payload }) {
  try {
    const data = yield call(signUp, payload.form);
    yield put(userSignUpSuccess(data));
    payload.history(payload.location);
  } catch (error) {}
}
export default function* postSaga() {
  yield takeLatest("USER_LOG_IN", userLoginSaga);
  yield takeLatest("USER_SIGN_UP", userSignUpSaga);
}
