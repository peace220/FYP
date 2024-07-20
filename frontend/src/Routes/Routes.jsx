import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home";
import Collaboration from "../pages/Collaboration";
import Courses from "../pages/Course/Courses";
import QuestionForm from "../components/instructor/questions/questionsforms";
import UserQuestion from "../components/instructor/questions/userQuestions";
import CommentsSection from "../components/comments/commentSection";
import InstructorMenu from "../components/instructor/instructorMenu";
import CurriculumCoursesPage from "../components/instructor/curriculum/CurriculumCoursePage";
import EnrolledCoursePage from "../pages/Course/enrolledCoursePage";
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
    path: "/Courses",
    element: <Courses />,
  },
  {
    path: "/questionform",
    element: <QuestionForm />,
  },
  {
    path: "/userquestions",
    element: <UserQuestion />,
  },
  {
    path: "/commentSection",
    element: <CommentsSection />,
  },
  {
    path: "/instructor",
    element: <InstructorMenu />,
    children: [
      {
        path: "course/courseid",
        element: <CurriculumCoursesPage />,
      },
    ],
  },
  {
    path: "/Courses/:courseId",
    element: <EnrolledCoursePage />,
  },
];
export default LoggedinRoutes;
