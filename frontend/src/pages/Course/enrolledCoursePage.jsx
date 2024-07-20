import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSelectedCourseDetails, enrollCourse } from "../../API/courseApi";
import CommentsSection from "../../components/comments/commentSection";
import Layout from "../Layout/Layout1";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      const fetchedCourse = await fetchSelectedCourseDetails(courseId);
      setCourse(fetchedCourse);
    };

    fetchCourseData();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      const response = await enrollCourse(courseId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <div className="container mx-auto p-4">
        {course && (
          <>
            <h1 className="text-3xl font-bold mb-4">{course.course_name}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleEnroll}
            >
              Enroll
            </button>
          </>
        )}
        <CommentsSection />
      </div>
    </Layout>
  );
};

export default CourseDetailsPage;
