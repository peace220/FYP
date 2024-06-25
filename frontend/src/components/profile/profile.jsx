import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import LanguageModal from "../Cards/LanguageModel/LanguageModal.jsx"

const Profile = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState("asasdsadd");
  const [showLanguageSettingsModal, setShowLanguageSettingsModal] =
    useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div
      className="flex items-center relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {username ? (
        <>
          <div className="flex justify-end items-center h-12">
            <span className="text-lg font-bold mr-10">{username}</span>
          </div>

          {dropdownVisible && (
            <div className="absolute top-12 right-9 bg-white border border-gray-200 shadow-lg py-2 w-40">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Edit Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                onClick={() => setShowLanguageSettingsModal(true)}
              >
                Language
                <span className="flex items-center">
                  <i className="fas fa-globe mr-2"></i>
                  asd
                </span>
                <FontAwesomeIcon icon={faGlobe} className="text-xl" />
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <span className="text-lg font-bold mr-4">Login</span>
          <span className="text-lg font-bold">Sign Up</span>
        </div>
      )}
      {showLanguageSettingsModal ? (
        <LanguageModal setModal={setShowLanguageSettingsModal} />
      ) : null}
    </div>
  );
};

export default Profile;
