import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import EventDetails from "../pages/EventDetails";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateEvent from "../pages/CreateEvent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "events/:id", element: <EventDetails /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "create-event", element: <CreateEvent /> },
        ],
      },
    ],
  },
]);