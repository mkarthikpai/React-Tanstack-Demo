import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/Api";

const FetchRQ = () => {
  // Tanstack UseQuery
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"], //UseState
    queryFn: fetchPosts, //UseEffect
    // gcTime: 1000, //Time to store data in cache , default its 5min
    // staleTime: 10000, //Till this time API call will not happen from the time its Fresh and moved to stale
    refetchInterval: 1000, //Polling Concept , which acts just like GROW , every second automatically calls the API
    refetchIntervalInBackground: true, // Used to call API even when im not active in the tab/screen
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
