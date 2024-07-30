import React, { useEffect, useState } from "react";
import { fetchCourses, createCourse } from "../../../API/curriculumApi";
import { useThemedStyles } from "../../../hooks/ThemeContrast";
import { useNavigate } from "react-router-dom";

const CurriculumCoursesPage = () => {
  const { textColor } = useThemedStyles();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getCourses = async () => {
    const coursesData = await fetchCourses();
    setCourses(coursesData);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const addCourse = async () => {
    const newCourse = {
      id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
      course_name: "",
      description: "",
    };
    await createCourse(newCourse);
    getCourses();
  };

  const handleCourseSelect = (courseId) => {
    navigate(`/instructor/courses/${courseId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className={`text-2xl font-bold mb-4 ${textColor}`}>Select a Course to Edit</h1>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li 
            key={course.id} 
            className="bg-white border border-gray-300 rounded p-3 cursor-pointer hover:bg-gray-100"
            onClick={() => handleCourseSelect(course.id)}
          >
            {course.course_name || "Untitled Course"}
          </li>
        ))}
      </ul>
      <button
        onClick={addCourse}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        + New Course
      </button>
    </div>
  );
};

export default CurriculumCoursesPage;