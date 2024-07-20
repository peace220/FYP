import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import LanguageModal from "../Cards/LanguageModel/LanguageModal.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/auth/profile",
            {
              headers: { "x-access-token": token },
            }
          );
          setUsername(response.data.username);
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
    <div className="flex items-center relative">
      <Link to="/userquestions" className="text-lg font-bold mr-4">
        QuestionsForms
      </Link>
      <Link to="/commentSection" className="text-lg font-bold mr-4">
        QuestionsForms
      </Link>
      {username ? (
        <>
          <Link to="/instructor" className="text-lg font-bold mr-4">
            Instructor
          </Link>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogOutButton}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-end items-center h-12">
          <Link to="/join/login" className="text-lg font-bold mr-4">
            Log in
          </Link>
          <Link to="/join/signup" className="text-lg font-bold mr-4">
            Sign Up
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
