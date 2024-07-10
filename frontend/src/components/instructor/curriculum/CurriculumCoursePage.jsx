import React, { useState } from "react";
import CurriculumCourse from "./CurriculumCourse";
import axios from "axios";

const CurriculumCoursesPage = () => {
  const [courses, setCourses] = useState([]);

  const addCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      title: "",
    };
    setCourses([...courses, newCourse]);
  };

  const updateCourse = (courseId, updateCourses) => {
    const updatedSections = courses.map((course) =>
      course.id === courseId ? updateCourses : course
    );
    setCourses(updatedSections);
  };

  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
  };

  const insertCourse = async () => {
    const response = await axios.post("http://localhost:5000/api/curriculum",{
      
    })
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Curriculum</h1>
      {/* <button onClick={consolelogg}>asdasdad</button> */}
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
