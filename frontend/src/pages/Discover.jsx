import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout/Layout1";
const CourseSelection = () => {
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState([]);

  const handleSelectCourse = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/courses/select",
        { course_name: courseName },
        {
          headers: { "x-access-token": token },
        }
      );
      alert("Course selected");
      fetchCourses();
    } catch (error) {
      alert("Error selecting course");
    }
  };

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/courses", {
        headers: { "x-access-token": token },
      });
      setCourses(response.data);
    } catch (error) {
      alert("Error fetching courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-center text-2xl mb-4">Select Course</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="course"
              >
                Course Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="course"
                type="text"
                placeholder="Course Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSelectCourse}
              >
                Select Course
              </button>
            </div>
          </form>
          <div className="mt-6">
            <h2 className="text-center text-2xl mb-4">Selected Courses</h2>
            <ul>
              {courses.map((course) => (
                <li key={course.id}>{course.course_name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseSelection;
