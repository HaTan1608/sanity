import axios from "axios";
import { client } from "../client";
import { searchQuery } from "../utils/data";

export const getPostData = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts");
};

export const getSearchPostData = (id) => {
  const query = searchQuery(...id.toLowerCase());
  return client.fetch(query);
};
