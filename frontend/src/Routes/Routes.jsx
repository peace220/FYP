import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home";
import Collaboration from "../pages/Collaboration";
import Discover from "../pages/Discover"
import QuestionForm from "../components/instructor/questions/questionsforms";
import UserQuestion from "../components/instructor/questions/userQuestions";
const sampleQuestions = [
  {
    id: 1,
    text: 'What is the capital of France?',
    type: 'multiple-choice',
    choices: ['Paris', 'London', 'Berlin', 'Madrid'],
  },
  {
    id: 2,
    text: 'Explain the theory of relativity.',
    type: 'essay',
  },
];
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
  {
    path:"/questionform",
    element: <QuestionForm/>,
  },
  {
    path:"/userquestions",
    element: <UserQuestion questions={sampleQuestions}/>,
  }
];
export default LoggedinRoutes;