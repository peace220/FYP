import React, { useState, useEffect } from "react";
import { fetchEnrolledCourses } from "../../API/courseApi"; 
import Layout from "../Layout/Layout1";
import { useNavigate } from "react-router-dom"; 

const EnrolledCoursesPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEnrolledCoursesData = async () => {
      const fetchedEnrolledCourses = await fetchEnrolledCourses(); 
      setEnrolledCourses(fetchedEnrolledCourses);
    };

    fetchEnrolledCoursesData();
  }, []);



  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Your Enrolled Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="border rounded-md p-4 shadow-md hover:shadow-lg cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-2">{course.course_name}</h2>
              <p className="text-gray-600">{course.description}</p>
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => {
                  navigate(`/Courses/${course.id}`);
                }}
              >
                View Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default EnrolledCoursesPage;
