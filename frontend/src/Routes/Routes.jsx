import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home";
import Collaboration from "../pages/Collaboration";
import Discover from "../pages/Discover"
const LoggedinRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/collaboration",
    element: <Collaboration />,
  },
  {
    path: "/join/login",
    element: <Login />,
  },
  {
    path: "/join/signup",
    element: <Signup />,
  },
  {
    path: "/discover",
    element: <Discover />,
  },
];
export default LoggedinRoutes;