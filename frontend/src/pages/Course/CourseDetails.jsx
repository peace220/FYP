import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSelectedCourseDetails, enrollCourse } from "../../API/courseApi";
import CommentsSection from "../../components/comments/commentSection";
import Layout from "../Layout/Layout1";
import { useThemedStyles } from "../../hooks/ThemeContrast";
import ThemedButton from "../../components/Theme/ThemeButton";

const CourseDetailsPage = () => {
  const { backgroundColor, textColor, cardBackground } = useThemedStyles();
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
      <div className={`min-h-screen ${backgroundColor}`}>
        <div className="container mx-auto p-4">
          {course && (
            <>
              <h1 className={`text-3xl font-bold mb-4 ${textColor}`}>
                {course.course_name}
              </h1>
              <p className={`mb-4 ${textColor}`}>{course.description}</p>
              <ThemedButton
                className="font-bold py-2 px-4 rounded mt-4"
                onClick={handleEnroll}
              >
                Enroll
              </ThemedButton>
            </>
          )}
          <CommentsSection />
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetailsPage;
