import {
  GET_SAVE_POST,
  GET_SAVE_POST_SUCCESS,
  SAVE_POST,
  SAVE_POST_SUCCESS,
  USER_LOG_IN,
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT,
  USER_SIGN_UP,
  USER_SIGN_UP_SUCCESS,
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
} from "../constants/user";

const initState = {
  user: {},
  savedPosts:[],
  loadPost:false,
  loadSave:false,
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
    case USER_UPDATE:
      return {
        ...state,
        load: true,
      };
    case USER_UPDATE_SUCCESS:
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.payload?.data })
      );
      return {
        ...state,
        user: action?.payload?.data,
        load: false,
      };
    case SAVE_POST:
      return {
        ...state,
        loadSave: true,
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        loadSave: false,
      };
    case GET_SAVE_POST:
      return {
        ...state,
        loadPost: true,
      };
    case GET_SAVE_POST_SUCCESS:
      console.log(action?.payload)
      return {
        ...state,
        savedPosts: action?.payload?.data?.result?.saved,
        loadPost: false,
      };
    default:
      return state;
  }
};

export default postReducer;
