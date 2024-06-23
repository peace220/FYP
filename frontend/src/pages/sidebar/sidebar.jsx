import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faConciergeBell, faUsers, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "../../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-full">
      <ul className="space-y-4 p-4">
        <li className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faHome} />
          <a href="#Home" className="hover:text-gray-400">
            Home
          </a>
        </li>
        <li className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faConciergeBell} />
          <a href="#Discover" className="hover:text-gray-400">
            Services
          </a>
        </li>
        <li className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faUsers} />
          <a href="#Categories" className="hover:text-gray-400">
            Clients
          </a>
        </li>
        <li className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faEnvelope} />
          <a href="#My Courses" className="hover:text-gray-400">
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
