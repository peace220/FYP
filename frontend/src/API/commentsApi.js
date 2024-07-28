import axios from "axios";
const apiBaseUrl = "http://localhost:5000/api/comments";

export const postComments = async (replyText, commentId, courseId) => {
  await axios.post(
    `${apiBaseUrl}/postComments`,
    {
      text: replyText,
      parent_id: commentId,
      course_id: courseId,
    },
    {
      headers: { "x-access-token": localStorage.getItem("token") },
    }
  );
};

export const getComments = async (courseId) => {
  const response = await axios.get(`${apiBaseUrl}/comments/${courseId}`);
  return response.data;
};
