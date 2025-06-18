import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import EventDetails from "../pages/EventDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "events/:id", element: <EventDetails /> },
      // Add more child routes here
    ],
  },
]);