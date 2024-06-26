import Login from "../components/Cards/Login/Login";
import Signup from "../components/Cards/Signup/Signup";
import Home from "../pages/Home";
import Sidebar from "../components/Sidebar/Sidebar";
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
    path: "/join/Signup",
    element: <Signup />,
  },
];
export default LoggedinRoutes;