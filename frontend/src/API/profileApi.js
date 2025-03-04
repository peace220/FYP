import axios from "axios";
const apiBaseUrl = "http://localhost:5000/api/auth";

export const loginApi = async (email, password) => {
  const response = await axios.post(`${apiBaseUrl}/login`, {
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);
};

export const getProfile = async () => {
  const response = await axios.get(`${apiBaseUrl}/profile`, {
    headers: { "x-access-token": localStorage.getItem("token") },
  });
  return response.data;
};

export const signUpApi = async (username, email, password) => {
  await axios.post(`${apiBaseUrl}/signup`, {
    username,
    email,
    password,
  });
};

export const updateProfileApi = async (username) => {
  await axios.put(
    `${apiBaseUrl}/profileUpdate`,
    {
      username,
    },
    {
      headers: { "x-access-token": localStorage.getItem("token") },
    }
  );
};

export const changePasswordApi = async (newPassword) => {
  await axios.put(
    `${apiBaseUrl}/changePassword`,
    {
      newPassword,
    },
    {
      headers: { "x-access-token": localStorage.getItem("token") },
    }
  );
};
