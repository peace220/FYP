import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Courses from "../pages/Course/Courses";
import QuestionForm from "../components/instructor/questions/questionsforms";
import UserQuestion from "../components/instructor/questions/userQuestions";
import CommentsSection from "../components/comments/commentSection";
import InstructorMenu from "../components/instructor/instructorMenu";
import CourseDetailsPage from "../pages/Course/CourseDetails";
import EnrolledCoursesPage from "../pages/Course/EnrolledCoursePage";
import UserSettings from "../components/profile/userSettings";
import ProtectedRoute from "../components/ProtectedRoute";
import CurriculumCoursesPage from "../components/instructor/curriculum/CurriculumCoursePage";
import CurriculumCourseEdit from "../components/instructor/curriculum/CurriculumCourseEdit";

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
    element: (
      <ProtectedRoute>
        <Courses />
      </ProtectedRoute>
    ),
  },
  {
    path: "/questionform",
    element: (
      <ProtectedRoute>
        <QuestionForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/userSettings",
    element: (
      <ProtectedRoute>
        <UserSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/commentSection",
    element: (
      <ProtectedRoute>
        <CommentsSection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/instructor",
    element: (
      <ProtectedRoute>
        <InstructorMenu />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "courses",
        element: <CurriculumCoursesPage />
      },
      {
        path: "courses/:courseId",
        element: <CurriculumCourseEdit />
      },
    ]
  },
  {
    path: "/Courses/:courseId",
    element: (
      <ProtectedRoute>
        <CourseDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Courses/:courseId/content",
    element: (
      <ProtectedRoute>
        <UserQuestion />
      </ProtectedRoute>
    ),
  },
  {
    path: "/EnrolledCourses",
    element: (
      <ProtectedRoute>
        <EnrolledCoursesPage />
      </ProtectedRoute>
    ),
  },
];

export default LoggedinRoutes;
