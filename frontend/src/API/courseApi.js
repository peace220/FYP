import axios from "axios";
const apiBaseUrl = "http://localhost:5000/api/courses";

export const enrollCourse = async (courseId) => {
  const response = await axios.post(
    `${apiBaseUrl}/enroll`,
    { courseId },
    { headers: { "x-access-token": localStorage.getItem("token") } }
  );
  return response.data;
};

export const fetchAllCourses = async () => {
  const response = await axios.get(`${apiBaseUrl}/publicCourses`, {
    headers: { "x-access-token": localStorage.getItem("token") },
  });
  return response.data;
};

export const fetchSelectedCourseDetails = async (courseId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

export const fetchEnrolledCourses = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/enrolledCourse`, {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
};

export const checkEnrollmentStatus = async (courseId) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/checkEnrollmentStatus/${courseId}`,
      {
        headers: { "x-access-token": localStorage.getItem("token") },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
};

export const fetchEnrolledCoursesContent = async (courseId) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/courses/${courseId}/sections`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
};

export const storeUserAnswer = async (answers) => {
  try {
    await axios.post(
      `${apiBaseUrl}/storeUserAnswer`,
      {
        question_id: answers.question_id,
        selected_option_id: answers.option_id,
        answer_text: answers.answer,
        questionType: answers.questionType,
      },
      {
        headers: { "x-access-token": localStorage.getItem("token") },
      }
    );
  } catch (error) {
    console.error("Error posting data", error);
    throw error;
  }
};

export const fetchTranscript = async (videoId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/transcript/${videoId}`);
    return response.data.transcript;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw error;
  }
};

export const fetchPreviousAnswers = async (courseId) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/previousAnswers/${courseId}`,
      {
        headers: { "x-access-token": localStorage.getItem("token") },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
};
