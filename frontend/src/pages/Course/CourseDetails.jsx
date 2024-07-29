import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSelectedCourseDetails, enrollCourse, checkEnrollmentStatus } from "../../API/courseApi";
import CommentsSection from "../../components/comments/commentSection";
import Layout from "../Layout/Layout1";
import { useThemedStyles } from "../../hooks/ThemeContrast";
import ThemedButton from "../../components/Theme/ThemeButton";

const CourseDetailsPage = () => {
  const { backgroundColor, textColor } = useThemedStyles();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      const fetchedCourse = await fetchSelectedCourseDetails(courseId);
      setCourse(fetchedCourse);
      const enrollmentStatus = await checkEnrollmentStatus(courseId);
      setIsEnrolled(enrollmentStatus);
    };
    fetchCourseData();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      await enrollCourse(courseId);
      setIsEnrolled(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccessContent = () => {
    navigate("content");
  };

  return (
    <Layout>
      <div className={`min-h-screen ${backgroundColor}`}>
        <div className="container mx-auto p-4">
          {course && (
            <>
              <h1 className={`text-3xl font-bold mb-4 ${textColor}`}>
                {course.course_name}
              </h1>
              <p className={`mb-4 ${textColor}`}>{course.description}</p>
              {isEnrolled ? (
                <ThemedButton
                  className="font-bold py-2 px-4 rounded mt-4"
                  onClick={handleAccessContent}
                >
                  Access Content
                </ThemedButton>
              ) : (
                <ThemedButton
                  className="font-bold py-2 px-4 rounded mt-4"
                  onClick={handleEnroll}
                >
                  Enroll
                </ThemedButton>
              )}
            </>
          )}
          <CommentsSection />
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetailsPage;
