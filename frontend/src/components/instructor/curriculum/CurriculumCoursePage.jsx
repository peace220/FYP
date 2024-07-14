import React, { useEffect, useState } from "react";
import CurriculumCourse from "./CurriculumCourse";
import {
  fetchCourses,
  createCourse,
  deleteCourse as deleteCourseApi,
} from "../../../API/courseApi";

const CurriculumCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    const coursesData = await fetchCourses();
    setCourses(coursesData);
  };
  useEffect(() => {
    getCourses();
  }, []);

  const addCourse = async () => {
    if (courses.length == 0) {
      const newCourse = {
        id: 1,
        course_name: "",
        description: "",
      };
      await createCourse(newCourse);
      getCourses();
    } else {
      const newCourse = {
        id: courses[courses.length - 1].id + 1,
        course_name: "",
        description: "",
      };
      await createCourse(newCourse);
      setCourses([...courses, newCourse]);
    }
  };

  const updateCourse = (courseId, updatedCourse) => {
    const updatedCourses = courses.map((course) =>
      course.id === courseId ? updatedCourse : course
    );
    setCourses(updatedCourses);
  };

  const deleteCourse = async (courseId) => {
    await deleteCourseApi(courseId);
    getCourses();
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
