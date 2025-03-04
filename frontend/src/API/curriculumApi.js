import axios from "axios";
const apiBaseUrl = "http://localhost:5000/api/curriculum";

export const fetchCourses = async () => {
  const response = await axios.get(`${apiBaseUrl}/courses`, {
    headers: { "x-access-token": localStorage.getItem("token") },
  });
  return response.data;
};

export const createCourse = async (course) => {
  await axios.post(
    `${apiBaseUrl}/courses`,
    {
      course_name: course.course_name,
      description: course.description,
    },
    { headers: { "x-access-token": localStorage.getItem("token") } }
  );
};

export const fetchCourseById = async (courseId) => {
  const response = await axios.get(`${apiBaseUrl}/courses/${courseId}`, {
    headers: { "x-access-token": localStorage.getItem("token") },
  });
  return response.data;
};

export const updateCourses = async (course) => {
  await axios.put(
    `${apiBaseUrl}/courses`,
    {
      id: course.id,
      course_name: course.course_name,
      description: course.description,
    },
    { headers: { "x-access-token": localStorage.getItem("token") } }
  );
};

export const deleteCourse = async (id) => {
  const response = await axios.put(
    `${apiBaseUrl}/courses/update`,
    { id: id },
    { headers: { "x-access-token": localStorage.getItem("token") } }
  );
  return response.data;
};

export const publishCourse = async (courseId) => {
  await axios.put(`${apiBaseUrl}/publish`, {
    course_id: courseId,
  });
};

export const fetchSections = async (courseId) => {
  const response = await axios.get(`${apiBaseUrl}/section`, {
    params: { course_id: courseId },
  });
  return response.data;
};

export const createSection = async (section) => {
  await axios.post(`${apiBaseUrl}/section`, {
    course_id: section.course_id,
    section_id: section.section_id,
    title: section.title,
    description: section.description,
  });
};

export const updateSection = async (section) => {
  await axios.put(`${apiBaseUrl}/section`, {
    course_id: section.course_id,
    section_id: section.section_id,
    title: section.title,
    description: section.description,
  });
};

export const deleteSection = async (course_id, section_id) => {
  const response = await axios.put(`${apiBaseUrl}/section/update`, {
    course_id: course_id,
    section_id: section_id,
  });
  return response.data;
};

export const fetchItems = async (courseId, sectionId) => {
  const response = await axios.get(`${apiBaseUrl}/items`, {
    params: { course_id: courseId, section_id: sectionId },
  });
  return response.data;
};

export const createLecture = async (items) => {
  await axios.post(`${apiBaseUrl}/lecture`, {
    lecture_id: items.id,
    section_id: items.section_id,
    course_id: items.course_id,
    order_num: items.order_num,
    lecture_title: items.title,
    description: items.description,
  });
};
export const updateLecture = async (items) => {
  await axios.put(`${apiBaseUrl}/lecture`, {
    course_id: items.course_id,
    section_id: items.section_id,
    lecture_id: items.id,
    title: items.title,
    description: items.description,
  });
};
export const deleteLecture = async (itemId, itemSectionId, itemCourseId) => {
  await axios.put(`${apiBaseUrl}/lecture/update`, {
    course_id: itemCourseId,
    section_id: itemSectionId,
    lecture_id: itemId,
  });
};

export const createQuiz = async (items) => {
  await axios.post(`${apiBaseUrl}/quiz`, {
    quiz_id: items.id,
    section_id: items.section_id,
    course_id: items.course_id,
    order_num: items.order_num,
    title: items.title,
    description: items.description,
  });
};

export const updateQuiz = async (items) => {
  await axios.put(`${apiBaseUrl}/quiz`, {
    course_id: items.course_id,
    section_id: items.section_id,
    quiz_id: items.id,
    title: items.title,
    description: items.description,
  });
};

export const deleteQuiz = async (itemId, itemSectionId, itemCourseId) => {
  await axios.put(`${apiBaseUrl}/quiz/update`, {
    course_id: itemCourseId,
    section_id: itemSectionId,
    quiz_id: itemId,
  });
};

export const uploadVideo = async (formData) => {
  await axios.post(`${apiBaseUrl}/uploadVideo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateVideo = async (formData) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/uploadVideo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating video:", error);
    throw error;
  }
};

export const fetchVideos = async (item) => {
  const response = await axios.get(`${apiBaseUrl}/videos`, {
    params: {
      lecture_id: item.id,
      section_id: item.section_id,
      course_id: item.course_id,
    },
  });
  return response.data;
};

export const createQuestion = async (questionData) => {
  console.log(questionData);
  const response = await axios.post(`${apiBaseUrl}/questions`, {
    quiz_id: questionData.quiz_id,
    course_id: questionData.course_id,
    section_id: questionData.section_id,
    question_type: questionData.question_type,
    question_text: questionData.question_text,
    options: questionData.options,
    answer: questionData.answer,
  });
  return response.data;
};

export const getQuestions = async (questionData) => {
  const response = await axios.get(`${apiBaseUrl}/questions`, {
    params: {
      quiz_id: questionData.id,
      section_id: questionData.section_id,
      course_id: questionData.course_id,
    },
  });
  return response.data;
};

export const updateQuestions = async (questionData) => {
  const response = await axios.put(`${apiBaseUrl}/question`, {
    quiz_id: questionData.quiz_id,
    section_id: questionData.section_id,
    course_id: questionData.course_id,
    question_id: questionData.question_id,
    answer: questionData.answer,
    options: questionData.options,
    question_text: questionData.question_text,
    question_type: questionData.question_type,
  });
  return response.data;
};
