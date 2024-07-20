import axios from "axios";
const apiBaseUrl = "http://localhost:5000/api/curriculum";

export const fetchCourses = async () => {
  const response = await axios.get(`${apiBaseUrl}/courses`, {
    headers: { "x-access-token": localStorage.getItem("token") },
  });
  return response.data;
};

export const fetchAllCourses = async () => {
  const response = await axios.get(`${apiBaseUrl}/publicCourses`);
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

export const deleteSection = async (id) => {
  const response = await axios.delete(`${apiBaseUrl}/section`, {
    data: { id: id },
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

export const createQuiz = async (items) => {
  await axios.post(`${apiBaseUrl}/quiz`, {
    quiz_id: items.id,
    section_id: items.section_id,
    course_id: items.course_id,
    title: items.title,
    description: items.description,
  });
};

export const uploadVideo = async (formData) => {
  await axios.post(`${apiBaseUrl}/uploadVideo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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

export const enrollCourse = async (courseId) => {
  const response = await axios.post(
    `${apiBaseUrl}/enroll`,
    { courseId },
    { headers: { "x-access-token": localStorage.getItem("token") } }
  );
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
