import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// To Fetch Data
export const fetchPosts = () => {
  return api.get("/posts");
};
