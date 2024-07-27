import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home";
import Courses from "../pages/Course/Courses";
import QuestionForm from "../components/instructor/questions/questionsforms";
import UserQuestion from "../components/instructor/questions/userQuestions";
import CommentsSection from "../components/comments/commentSection";
import InstructorMenu from "../components/instructor/instructorMenu";
import CourseDetailsPage from "../pages/Course/CourseDetails";
import EnrolledCoursesPage from "../pages/Course/EnrolledCoursePage";
import UserSettings from "../components/profile/userSettings";
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
  {
    path: "/Courses",
    element: <Courses />,
  },
  {
    path: "/questionform",
    element: <QuestionForm />,
  },
  {
    path: "/userSettings",
    element: <UserSettings />,
  },
  {
    path: "/commentSection",
    element: <CommentsSection />,
  },
  {
    path: "/instructor",
    element: <InstructorMenu />,
  },
{
  path: "/Courses/:courseId",
  element: <CourseDetailsPage />,
},
{
  path: "/Courses/:courseId/content", 
  element: <UserQuestion />,
},
  {
    path: "/EnrolledCourses",
    element: <EnrolledCoursesPage />,
  },
];
export default LoggedinRoutes;
