import {
  GET_LIST_POST,
  GET_LIST_POST_SUCCESS,
  GET_SEARCH_LIST_POST,
  GET_SEARCH_LIST_POST_SUCCESS,
} from "./constant";

export const getListPost = (payload) => {
  return {
    type: GET_LIST_POST,
    payload,
  };
};

export const getListPostSuccess = (payload) => {
  return {
    type: GET_LIST_POST_SUCCESS,
    payload,
  };
};

export const getSearchListPost = (payload) => {
  console.log("1",payload);
  return {
    type: GET_SEARCH_LIST_POST,
    payload,
  };
};

export const getSearchListPostSuccess = (payload) => {
  console.log(payload);
  return {
    type: GET_SEARCH_LIST_POST_SUCCESS,
    payload,
  };
};
