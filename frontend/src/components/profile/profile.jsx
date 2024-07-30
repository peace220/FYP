import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import LanguageModal from "../Cards/LanguageModel/LanguageModal.jsx";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../../API/profileApi.js";
import { useThemedStyles } from "../../hooks/ThemeContrast.jsx";
import { useTranslation } from "react-i18next";
const Profile = () => {
  const { t } = useTranslation();
  const { backgroundColor, textColor, headerColor, cardBackground } =
    useThemedStyles();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [showLanguageSettingsModal, setShowLanguageSettingsModal] =
    useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleLogOutButton = () => {
    localStorage.removeItem("token");
    navigate("/join/login");
  };

  const handleUserSetting = () => {
    navigate("/userSettings");
  };

  const menuItemClass = `block w-full text-left px-4 py-2 ${textColor} hover:${backgroundColor} hover:${textColor} transition duration-150 ease-in-out`;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const profileinfo = await getProfile();
          setUsername(profileinfo.username);
        } catch (error) {
          console.error("Error fetching user profile", error);
        }
      } else {
        setUsername("");
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div
      className={`flex items-center w-full ${headerColor} justify-end shadow-lg`}
    >
      {username ? (
        <>
          <Link to="/instructor/courses" className="text-lg font-bold mr-4">
            {t("instructor")}
          </Link>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="flex justify-end items-center h-12">
              <span className="text-lg font-bold mr-10">{username}</span>
            </div>

            {dropdownVisible && (
              <div
                className={`absolute top-12 right-9 ${cardBackground} border border-gray-200  rounded-md overflow-hidden w-48`}
              >
                <button
                  className={`${menuItemClass} border-b border-gray-200`}
                  onClick={handleUserSetting}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  {t("editprofile")}
                </button>
                <button
                  className={`${menuItemClass} `}
                  onClick={() => setShowLanguageSettingsModal(true)}
                >
                  <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                  {t("language.language")}
                </button>
                <button className={menuItemClass} onClick={handleLogOutButton}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-end items-center h-12">
          <Link to="/join/login" className="text-lg font-bold mr-4">
            {t("login")}
          </Link>
          <Link to="/join/signup" className="text-lg font-bold mr-4">
            {t("signup")}
          </Link>
        </div>
      )}
      {showLanguageSettingsModal ? (
        <LanguageModal setModal={setShowLanguageSettingsModal} />
      ) : null}
    </div>
  );
};

export default Profile;
