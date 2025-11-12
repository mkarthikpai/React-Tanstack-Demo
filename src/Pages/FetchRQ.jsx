import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/Api";

const FetchRQ = () => {
  // Tanstack UseQuery
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"], //UseState
    queryFn: fetchPosts, //UseEffect
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message || "Something went wrong!"}</p>;
  }
  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
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

export default FetchRQ;
