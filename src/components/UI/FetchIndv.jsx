import { useQuery } from "@tanstack/react-query";
import { fetchInvPost } from "../../API/Api";
import { NavLink, useParams } from "react-router-dom";

const FetchIndv = () => {
  const { id } = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", id], //UseState
    queryFn: () => fetchInvPost(id), //UseEffect
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message || "Something went wrong!"}</p>;
  }

  return (
    <div className="section-accordion">
      <h1>Post ID Number - {id}</h1>
      <div>
        <p>ID: {data.id}</p>
        <p>Title: {data.title}</p>
        <p>Body: {data.body}</p>
      </div>
      <NavLink to="/rq">
        <button>Go Back</button>
      </NavLink>
    </div>
  );
};

export default FetchIndv;
