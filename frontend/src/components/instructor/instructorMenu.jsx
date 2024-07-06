import { useState } from "react";
import { Link } from "react-router-dom";
import CurriculumPage from "./curriculum/CurriculumPage";
const instructorMenu = () => {
  const handleLogin = async () => {};
  return (
    <div>
      <div className="flex justify-end items-center h-12">
        <Link to="/" className="text-lg font-bold mr-10">
          Student
        </Link>
      </div>
      <div className="flex justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md mt-10">
          <div
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <CurriculumPage />
          </div>
        </div>
      </div>
    </div>
  );
};
export default instructorMenu;
