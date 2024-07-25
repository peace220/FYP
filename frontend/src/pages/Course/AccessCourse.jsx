import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout1";
import { fetchCourseDetails, fetchCourseQuestions } from "../../API/curriculumApi";
import { Link } from "react-router-dom";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // const fetchCourseData = async () => {
    //   const fetchedCourse = await fetchCourseDetails(courseId);
    //   setCourse(fetchedCourse);
    // };

    // const fetchQuestionsData = async () => {
    //   const fetchedQuestions = await fetchCourseQuestions(courseId);
    //   setQuestions(fetchedQuestions);
    // };

    // fetchCourseData();
    // fetchQuestionsData();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{course.course_name}</h1>
        <div className="mb-4">
          <p className="text-gray-600">{course.description}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Lectures</h2>
          <ul>
            {course.lectures.map((lecture) => (
              <li key={lecture.id}>
                <Link to={`/Courses/${courseId}/lecture/${lecture.id}`}>
                  {lecture.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Questions</h2>
          <Link to={`/Courses/${courseId}/questions`}>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
              View Questions
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CoursePage;
