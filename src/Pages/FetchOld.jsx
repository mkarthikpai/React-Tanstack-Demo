import { useEffect, useState } from "react";
import { fetchPosts } from "../API/Api";

const FetchOld = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsData();
  }, []);

  const getPostsData = async () => {
    try {
      const res = await fetchPosts();
      res.status === 200 ? setPosts(res?.data) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <div>
      <ul className="section-accordion">
        {posts?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchOld;
