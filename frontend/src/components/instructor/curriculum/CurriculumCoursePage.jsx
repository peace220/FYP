import React, { useState } from "react";
import CurriculumCourse from "./CurriculumCourse";

const CurriculumCoursesPage = () => {
  const [courses, setCourses] = useState([]);

  const addCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      title: `Course ${courses.length + 1}`,
      sections: [],
    };
    setCourses([...courses, newCourse]);
  };

  const updateCourse = (courseId, sections) => {
    const updatedCourses = courses.map((course) =>
      course.id === courseId ? { ...course, sections } : course
    );
    setCourses(updatedCourses);
  };

  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Curriculum</h1>
      {courses.map((course) => (
        <CurriculumCourse
          key={course.id}
          course={course}
          updateCourse={updateCourse}
          deleteCourse={deleteCourse}
        />
      ))}
      <button
        onClick={addCourse}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        + Course
      </button>
    </div>
  );
};

export default CurriculumCoursesPage;
