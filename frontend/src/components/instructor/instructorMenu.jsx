import { Link } from "react-router-dom";
import CurriculumCoursePage from "./curriculum/CurriculumCoursePage";
const instructorMenu = () => {
  const handleLogin = async () => {};
  return (
    <div>
      <div className="flex justify-end items-center h-12">
        <Link to="/" className="text-lg font-bold mr-10">
          Student
        </Link>
      </div>
      <div className="flex justify-center h-full">
        <div className="w-full">
          <div
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-8 shadow-gray-300"
          >
            <CurriculumCoursePage />
          </div>
        </div>
      </div>
    </div>
  );
};
export default instructorMenu;
