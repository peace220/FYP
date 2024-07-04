import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../styles/sidebar.css";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen">
      <ul className="space-y-4 p-4 text-lg mt-20">
        <li className="flex items-center space-x-2 py-2">
          <FontAwesomeIcon icon={faHome} className="text-xl" />
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li className="flex items-center space-x-2 py-2">
          <FontAwesomeIcon icon={faCompass} className="text-xl" />
          <Link to="/discover" className="hover:text-gray-400">
          Discover
          </Link>
        </li>
        <li className="flex items-center space-x-2 py-2">
          <FontAwesomeIcon icon={faBook} className="text-xl" />
          <a href="#My Courses" className="hover:text-gray-400">
            My Courses
          </a>
        </li>
        <li className="flex items-center space-x-2 py-2">
          <FontAwesomeIcon icon={faHome} className="text-xl" />
          <Link to="/Collaboration" className="hover:text-gray-400">
            Collaboration
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
