import axios from "axios";

const API = axios.create();

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`/api/posts/${id}`);
export const fetchPosts = (category, page) =>
  API.get(`/api/posts?category=${category}&page=${page || 1}`);
export const fetchPostsByCreator = (id) =>
  API.get(`/api/posts/creator?id=${id}`);
export const fetchPostsBySearch = (searchQuery) =>
  axios.get(`/api/posts/search?searchQuery=${searchQuery || "none"}`);
export const createPost = (newPost) => API.post("/api/posts", newPost);
export const savePost = (data) => {
  console.log(data);
  API.post(`/api/user/save?userId=${data?.userId}&postId=${data?.postId}`);
};

export const fetchSavePost = (data) =>
  API.get(`/api/user/save?userId=${data}`);
export const likePost = (id) => API.patch(`/api/posts/${id}/likePost`);
export const comment = (id, value) => {
  API.post(`/api/posts/${id}/commentPost`, { value });
};
export const updatePost = (id, updatedPost) => {
  API.patch(`/api/posts/${id}`, updatedPost);
};
export const deletePost = (id) => API.delete(`/api/posts/${id}`);

export const signIn = (formData) => API.post("/api/user/signin", formData);
export const signUp = (formData) => API.post("/api/user/signup", formData);

export const userUpdate = (id, updatedUser) =>
  API.patch(`/api/user/${id}`, updatedUser);
