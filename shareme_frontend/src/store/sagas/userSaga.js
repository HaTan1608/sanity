import { call, put, takeLatest } from "redux-saga/effects";
import { userLoginSuccess, userSignUpSuccess, userUpdateSuccess } from "../actions/userActions";
import { signIn, signUp, userUpdate } from "../api/postsAPI";

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

function* userUpdateSaga({ userId, payload }) {
  console.log(payload)
  try {
    const data = yield call(userUpdate, userId, payload);
    yield put(userUpdateSuccess(data));
  } catch (error) {}
}
export default function* postSaga() {
  yield takeLatest("USER_LOG_IN", userLoginSaga);
  yield takeLatest("USER_SIGN_UP", userSignUpSaga);
  yield takeLatest("USER_UPDATE", userUpdateSaga);

}
