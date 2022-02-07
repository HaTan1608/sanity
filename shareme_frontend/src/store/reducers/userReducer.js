import {
  USER_LOG_IN,
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT,
  USER_SIGN_UP,
  USER_SIGN_UP_SUCCESS,
} from "../constants/user";

const initState = {
  user: {},
  load: false,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOG_IN:
      return {
        ...state,
        load: true,
      };
    case USER_LOG_IN_SUCCESS:
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.payload?.data })
      );
      return {
        ...state,
        user: action?.payload?.data,
        load: false,
      };
    case USER_LOG_OUT:
      return {
        ...state,
        users: {},
      };
    case USER_SIGN_UP:
      return {
        ...state,
        load: true,
      };
    case USER_SIGN_UP_SUCCESS:
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.payload?.data })
      );
      return {
        ...state,
        user: action?.payload?.data,
        load: false,
      };
    default:
      return state;
  }
};

export default postReducer;
