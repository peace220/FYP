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
    params: { courseId: courseId }
  });
  return response.data;
};

export const createSection = async (section) => {
  await axios.post(
    `${apiBaseUrl}/section`,
    {
      course_id: section.courseId,
      section_id: section.section_id,
      title: section.title,
      description: section.description,
    }
  );
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
