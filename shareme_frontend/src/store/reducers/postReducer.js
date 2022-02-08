import {
  GET_LIST_POST,
  GET_LIST_POST_SUCCESS,
  GET_SEARCH_LIST_POST,
  GET_SEARCH_LIST_POST_SUCCESS,
  GET_POST_BY_ID,
  GET_POST_BY_ID_SUCCESS,
  CREATE_POST_SUCCESS,
  CREATE_POST,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
} from "../constants/posts";

const initState = {
  posts: [],
  post: {},
  load: false,
};

const postReducer = (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case GET_LIST_POST:
      return {
        ...state,
        load: true,
      };
    case GET_LIST_POST_SUCCESS:
      return {
        ...state,
        posts: action?.payload?.data?.data,
        load: false,
      };
    case GET_SEARCH_LIST_POST:
      return {
        ...state,
        load: true,
      };
    case GET_SEARCH_LIST_POST_SUCCESS:
      return {
        ...state,
        posts: action?.payload?.data?.data,
        load: false,
      };
    case GET_POST_BY_ID:
      return {
        ...state,
        load: true,
      };
    case GET_POST_BY_ID_SUCCESS:
      return {
        ...state,
        post: action?.payload?.data,
        load: false,
      };
    case CREATE_POST:
      return {
        ...state,
        load: true,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        load: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        load: true,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        load: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        load: true,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        load: false,
      };
    default:
      return state;
  }
};

export default postReducer;
