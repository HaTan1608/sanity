import {
  USER_LOG_IN,
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT,
} from "../constants/user";

export const userLogout = () => {
  localStorage.removeItem("user");
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
