import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import EventDetails from "../pages/EventDetails";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import EditProfile from "../components/EditProfile";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateEvent from "../pages/CreateEvent";
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "events/:id", element: <EventDetails /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <NotFound /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "create-event", element: <CreateEvent /> },
          { path: "profile", element: <Profile /> },
          { path: "profile/edit", element: <EditProfile /> },
        ],
      },
    ],
  },
]);