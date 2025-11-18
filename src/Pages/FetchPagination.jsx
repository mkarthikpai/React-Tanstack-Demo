import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, fetchPaginatedPosts } from "../API/Api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const FetchPagination = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const queryClient = useQueryClient();

  // Tanstack UseQuery
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["pageposts", pageNumber], //UseState
    queryFn: () => fetchPaginatedPosts(pageNumber), //UseEffect
    placeholderData: keepPreviousData, //When clicking on Next it was showing loading which is not good user experience so to avoid that use this, which holds previous data and fetches and then shows new.
  });

  // Mutation function to delte a post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      // Data is confirmation message and Id is the card id deleted
      queryClient.setQueryData(["pageposts", pageNumber], (curElem) => {
        return curElem?.filter((post) => post.id !== id);
      });
      // queryClient.setQueryData used to access cache data and display updated data as per the condition
    },
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
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
            </li>
          );
        })}
      </ul>
      <div className="pagination-section container">
        <button
          disabled={pageNumber === 0}
          onClick={() => setPageNumber((prev) => prev - 3)}
        >
          Prev
        </button>
        <h3 style={{ color: "white" }}>{pageNumber / 3 + 1}</h3>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
};

export default FetchPagination;
