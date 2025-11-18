import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// To Fetch Data
export const fetchPosts = async () => {
  const res = await api.get("/posts?_start=0&_limit=3");
  return res.status === 200 ? res?.data : [];
};

// To fetch the Indv Data
export const fetchInvPost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

// To fetch Pagination
export const fetchPaginatedPosts = async (pageNumber) => {
  const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
  return res.status === 200 ? res?.data : [];
};

// To Delete Post

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};
