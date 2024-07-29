import React, { useState } from "react";
import Layout from "../Layout/Layout1";
import { useThemedStyles } from "../../hooks/ThemeContrast";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../API/profileApi";

const Login = () => {
  const { backgroundColor, textColor, cardBackground } = useThemedStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    // if (!emailRegex.test(email)) {
    //   setEmailError("Please enter a valid email address.");
    //   return;
    // } else {
    //   setEmailError(null);
    // }

    try {
      await loginApi(email, password);
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <Layout>
      <div
        className={`flex justify-center items-center h-full ${backgroundColor}`}
      >
        <div
          className={`w-full max-w-md ${cardBackground} shadow-md rounded px-8 pt-6 pb-8 mb-4`}
        >
          <h2 className={`text-center text-2xl mb-4 ${textColor}`}>Log In</h2>
          {errorMessage && (
            <p className={`text-red-500 text-xs italic mb-2 ${textColor}`}>
              {errorMessage}
            </p>
          )}
          <form className="" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label
                className={`block ${textColor} text-sm font-bold mb-2`}
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className={`text-red-500 text-xs italic ${textColor}`}>
                  {emailError}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className={`block ${textColor} text-sm font-bold mb-2`}
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="password"
                type="password"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="button"
                onClick={handleLogin}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
