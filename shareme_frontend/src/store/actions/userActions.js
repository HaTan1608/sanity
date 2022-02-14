import {
  USER_LOG_IN,
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT,
  USER_SIGN_UP,
  USER_SIGN_UP_SUCCESS,
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
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

export const userUpdate = (userId, payload) => {
  return {
    type: USER_UPDATE,
    userId,
    payload,
  };
};

export const userUpdateSuccess = (payload) => {
  return {
    type: USER_UPDATE_SUCCESS,
    payload,
  };
};

