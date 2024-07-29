import React, { useState } from "react";
import { useThemedStyles } from "../../hooks/ThemeContrast";
import { updateProfileApi, changePasswordApi } from "../../API/profileApi";
import { useNavigate } from "react-router-dom";
function ProfileSettings() {
  const navigate = useNavigate();
  const { textColor, cardBackground } = useThemedStyles();
  const [activeTab, setActiveTab] = useState("profile");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleProfileUpdate = async () => {
    if (!username) {
      setErrorMessage("Please enter a username.");
      return;
    }

    try {
      await updateProfileApi(username);
      window.location.reload(); 
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Error updating profile. Please try again.");
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }
    try {
      await changePasswordApi(newPassword);
      localStorage.removeItem("token");
      navigate("/join/login");
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Error changing password. Please try again.");
    }
  };

  return (
    <div className={`flex justify-center items-center h-full `}>
      <div
        className={`w-full max-w-md ${cardBackground} shadow-md rounded px-8 pt-6 pb-8 mb-4`}
      >
        <h2 className={`text-center text-2xl mb-4 ${textColor}`}>
          User Settings
        </h2>
        <div className="flex mb-4">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "profile"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => handleTabChange("profile")}
          >
            Profile
          </button>
          <button
            className={`ml-2 px-4 py-2 rounded-md ${
              activeTab === "password"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => handleTabChange("password")}
          >
            Password
          </button>
        </div>

        {errorMessage && (
          <p className={`text-red-500 text-xs italic mb-2 ${textColor}`}>
            {errorMessage}
          </p>
        )}

        {activeTab === "profile" && (
          <form className="" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label
                className={`block ${textColor} text-sm font-bold mb-2`}
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="button"
                onClick={handleProfileUpdate}
              >
                Update Profile
              </button>
            </div>
          </form>
        )}

        {activeTab === "password" && (
          <form className="" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label
                className={`block ${textColor} text-sm font-bold mb-2`}
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="newPassword"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className={`block ${textColor} text-sm font-bold mb-2`}
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="button"
                onClick={handlePasswordChange}
              >
                Change Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileSettings;
