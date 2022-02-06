import axios from "axios";

const API = axios.create();

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  console.log(req);
  return req;
});

export const fetchPost = (id) => API.get(`/api/posts/${id}`);
export const fetchPosts = (page) => API.get(`/api/posts?page=${page || 1}`);
export const fetchPostsByCreator = (name) =>
  API.get(`/api/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) =>
  axios.get(`/api/posts/search?searchQuery=${searchQuery || "none"}`);
export const createPost = (newPost) => API.post("/api/posts", newPost);
export const likePost = (id) => API.patch(`/api/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/api/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) =>
  API.patch(`/api/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/api/posts/${id}`);

export const signIn = (formData) => API.post("/api/user/signin", formData);
export const signUp = (formData) => API.post("/api/user/signup", formData);
