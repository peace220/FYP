import Login from "../components/Cards/Login/Login";
import Signup from "../components/Cards/Signup/Signup";
import Home from "../pages/Home";
const LoggedinRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/join/login",
    element: <Login />,
  },
  {
    path: "/join/signup",
    element: <Signup />,
  },
];
export default LoggedinRoutes;