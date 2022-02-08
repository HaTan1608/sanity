import {
  GET_LIST_POST,
  GET_LIST_POST_SUCCESS,
  GET_SEARCH_LIST_POST,
  GET_SEARCH_LIST_POST_SUCCESS,
  GET_POST_BY_ID,
  GET_POST_BY_ID_SUCCESS,
  CREATE_POST,
  CREATE_POST_SUCCESS,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
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

export const createPost = (payload) => {
  return {
    type: CREATE_POST,
    payload,
  };
};

export const createPostSuccess = (payload) => {
  return {
    type: CREATE_POST_SUCCESS,
    payload,
  };
};

export const updatePost = (pinId, payload, navigate) => {
  return {
    type: UPDATE_POST,
    navigate,
    pinId,
    payload,
  };
};

export const updatePostSuccess = (payload) => {
  return {
    type: UPDATE_POST_SUCCESS,
    payload,
  };
};

export const addComment = (pinId, payload) => {
  return {
    type: ADD_COMMENT,
    pinId,
    payload,
  };
};

export const addCommentSuccess = (payload) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    payload,
  };
};
