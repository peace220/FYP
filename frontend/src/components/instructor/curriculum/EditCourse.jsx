import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurriculumCourse from "./CurriculumCourse";
import {deleteCourse } from "../../../API/curriculumApi";
import { fetchSelectedCourseDetails } from "../../../API/courseApi";


const CourseEditPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const courseData = await fetchSelectedCourseDetails(courseId);
      setCourse(courseData);
    };
    fetchCourse();
  }, [courseId]);

  const handleUpdateCourse = async (updatedCourse) => {
    // await updateCourse(updatedCourse);
    setCourse(updatedCourse);
  };

  const handleDeleteCourse = async () => {
    await deleteCourse(courseId);
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <CurriculumCourse
        course={course}
        updateCourse={handleUpdateCourse}
        deleteCourse={handleDeleteCourse}
      />
    </div>
  );
};

export default CourseEditPage;