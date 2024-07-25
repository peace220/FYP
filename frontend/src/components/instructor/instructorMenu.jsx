import { Link } from "react-router-dom";
import CurriculumCoursePage from "./curriculum/CurriculumCoursePage";
import { useThemedStyles } from "../../hooks/ThemeContrast";
import React from "react";
const InstructorPage = () => {
  const { backgroundColor, textColor } = useThemedStyles();
  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      <div className="flex justify-end items-center h-12">
        <Link to="/" className={`text-lg font-bold mr-10 ${textColor}`}>
          Student
        </Link>
      </div>
      <div className="flex justify-center h-full">
        <div className="w-full">
          <CurriculumCoursePage />
        </div>
      </div>
    </div>
  );
};
export default InstructorPage;
