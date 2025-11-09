import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./Pages/Home";
import FetchOld from "./Pages/FetchOld";
import FetchRQ from "./Pages/FetchRQ";

// Create a router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <FetchRQ />,
      },
      // {
      //   path: "/rq/:id",
      //   element: <FetchIndv />,
      // },
      // {
      //   path: "/infinite",
      //   element: <InfiniteScroll />,
      // },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
