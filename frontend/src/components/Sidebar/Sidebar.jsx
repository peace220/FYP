import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCompass, faBook } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "../../styles/sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <ul className="space-y-4 p-4 text-lg mt-20">
        <li className="flex items-center space-x-2 py-2">
          <FontAwesomeIcon icon={faHome} className="text-xl" />
          <Link to="/" className="hover:text-gray-400">
            {t('sidebar.home')}
          </Link>
        </li>
        <li className="flex items-center space-x-2 py-2">
          <FontAwesomeIcon icon={faCompass} className="text-xl" />
          <Link to="/Courses" className="hover:text-gray-400">
            {t('sidebar.discover')}
          </Link>
        </li>
        <li className="flex items-center space-x-2 py-2">
          <FontAwesomeIcon icon={faBook} className="text-xl" />
          <Link to="/EnrolledCourses" className="hover:text-gray-400">
            {t('sidebar.myCourses')}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
