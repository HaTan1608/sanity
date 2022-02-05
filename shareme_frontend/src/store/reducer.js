import {
  GET_LIST_POST,
  GET_LIST_POST_SUCCESS,
  GET_SEARCH_LIST_POST,
  GET_SEARCH_LIST_POST_SUCCESS,
} from "./constant";

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_LIST_POST:
      return {
        ...state,
        load: true,
      };
    case GET_LIST_POST_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        posts: data,
        load: false,
      };
    case GET_SEARCH_LIST_POST:
      return {
        ...state,
        load: true,
      };
    case GET_SEARCH_LIST_POST_SUCCESS:
      console.log(action);
      return {
        ...state,
        posts: [],
        load: false,
      };
    default:
      return state;
  }
};

export default postsReducer;
