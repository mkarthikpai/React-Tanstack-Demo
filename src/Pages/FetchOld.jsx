import { useEffect, useState } from "react";
import { fetchPosts } from "../API/Api";

const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostsData();
  }, []);

  const getPostsData = async () => {
    try {
      const res = await fetchPosts();
      setPosts(res);
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  );
};

export default FetchOld;
