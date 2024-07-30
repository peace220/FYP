import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useThemedStyles } from "../../hooks/ThemeContrast";
const InstructorPage = () => {
  const { backgroundColor, textColor } = useThemedStyles();

  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      <div className="flex justify-between items-center h-12 shadow-lg px-10">
        <h1 className={`text-2xl font-bold ${textColor}`}>
          Instructor Menu
        </h1>
        <Link to="/" className={`text-lg font-bold ${textColor}`}>
          Switch to Student View
        </Link>
      </div>
      <div className="flex p-4">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InstructorPage;
