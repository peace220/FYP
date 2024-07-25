import React, { useState, useEffect } from "react";
import { fetchAllCourses } from "../../API/courseApi";
import Layout from "../Layout/Layout1";
import { useNavigate } from "react-router-dom";
import { useThemedStyles } from "../../hooks/ThemeContrast";

const SelectCoursePage = () => {
  const { backgroundColor, textColor, cardBackground } = useThemedStyles();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const fetchedCourses = await fetchAllCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <p className={`text-xl ${textColor}`}>Loading courses...</p>;
    }

    if (courses.length === 0) {
      return (
        <div className={`text-center ${textColor}`}>
          <p className="text-xl mb-4">No courses available at the moment.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`border rounded-md p-4 shadow-md hover:shadow-lg cursor-pointer ${cardBackground}`}
          >
            <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>
              {course.course_name}
            </h2>
            <p className={`${textColor} opacity-80`}>{course.description}</p>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => navigate(`/Courses/${course.id}`)}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className={`min-h-screen ${backgroundColor}`}>
        <div className="container mx-auto p-4">
          <h1 className={`text-3xl font-bold mb-4 ${textColor}`}>
            Select a Course
          </h1>
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default SelectCoursePage;