import {
  GET_LIST_POST,
  GET_LIST_POST_SUCCESS,
  GET_SEARCH_LIST_POST,
  GET_SEARCH_LIST_POST_SUCCESS,
  GET_POST_BY_ID,
  GET_POST_BY_ID_SUCCESS,
} from "../constants/posts";

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
  return {
    type: GET_SEARCH_LIST_POST,
    payload,
  };
};

export const getSearchListPostSuccess = (payload) => {
  return {
    type: GET_SEARCH_LIST_POST_SUCCESS,
    payload,
  };
};

export const getPostById = (payload) => {
  return {
    type: GET_POST_BY_ID,
    payload,
  };
};

export const getPostByIdSuccess = (payload) => {
  return {
    type: GET_POST_BY_ID_SUCCESS,
    payload,
  };
};
