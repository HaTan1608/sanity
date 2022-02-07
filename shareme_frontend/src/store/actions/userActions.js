import {
  USER_LOG_IN,
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT,
  USER_SIGN_UP,
  USER_SIGN_UP_SUCCESS,
} from "../constants/user";

export const userLogout = () => {
  localStorage.removeItem("profile");
  return {
    type: USER_LOG_OUT,
  };
};

export const userLogin = (payload) => {
  return {
    type: USER_LOG_IN,
    payload,
  };
};

export const userLoginSuccess = (payload) => {
  return {
    type: USER_LOG_IN_SUCCESS,
    payload,
  };
};

export const userSignUp = (payload) => {
  return {
    type: USER_SIGN_UP,
    payload,
  };
};

export const userSignUpSuccess = (payload) => {
  return {
    type: USER_SIGN_UP_SUCCESS,
    payload,
  };
};
