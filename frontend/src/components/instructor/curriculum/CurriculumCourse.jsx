import React, { useState, useEffect } from "react";
import CurriculumSection from "./CurriculumSections";
import {
  updateCourses as updateCourseApi,
  fetchSections,
  createSection,
  deleteSection as deleteSectionApi,
  publishCourse as publishCourseApi,
} from "../../../API/curriculumApi";
import ThemedButton from "../../Theme/ThemeButton";

const CurriculumCourse = ({ course, updateCourse, deleteCourse }) => {
  const [sections, setSections] = useState(course.sections || []);
  const [showButton, setShowButton] = useState(false);
  const [course_name, setCourse_name] = useState(course.course_name);
  const [isCourseConfirmed, setIsCourseConfirmed] = useState(
    !!course.course_name
  );
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(course.description);

  const getSections = async () => {
    const sectionData = await fetchSections(course.id);
    let sectionCounter = 0;
    let maxSectionId = 0;
    const rearrangedData = sectionData.map((section) => {
      sectionCounter++;
      maxSectionId = Math.max(maxSectionId, section.section_id);
      return { ...section, arranged_id: sectionCounter };
    });
    setSections(rearrangedData);
  };

  const addSection = async () => {
    if (sections.length == 0) {
      const newSection = {
        section_id: 1,
        course_id: course.id,
        title: "",
        description: "",
      };
      await createSection(newSection);
      getSections();
    } else {
      const newSection = {
        section_id: sections[sections.length - 1].section_id + 1,
        course_id: course.id,
        title: "",
        description: "",
      };
      await createSection(newSection);
      getSections();
    }
  };

  const updateSection = (section_id, updatedSection) => {
    const updatedSections = sections.map((section) =>
      section.section_id === section_id ? updatedSection : section
    );
    getSections();
    setSections(updatedSections);
  };

  const deleteSection = async (id) => {
    await deleteSectionApi(course.id, id);
    getSections();
  };

  const saveCourse = async () => {
    const courseData = { ...course, course_name, description };
    updateCourse(course.id, courseData);
    setIsCourseConfirmed(true);
    setIsEditing(false);
    await updateCourseApi(courseData);
  };

  const publishCourse = async () => {
    await publishCourseApi(course.id);
  };

  const cancelEdit = () => {
    setShowButton(true);
    setIsEditing(false);
  };

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  useEffect(() => {
    getSections();
  }, []);

  return (
    <div className="border border-gray-500 p-4 mb-6 bg-white space-y-2">
      <div
        className="flex justify-between items-center mb-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className={`text-xl font-bold`}>
          Course: {` ${course.course_name}`}
        </h2>
        {showButton && isEditing == false && (
          <div>
            <ThemedButton
              type="edit"
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-2 py-1 rounded mr-3"
            >
              Edit
            </ThemedButton>
            <ThemedButton
              type="delete"
              onClick={() => deleteCourse(course.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </ThemedButton>
          </div>
        )}
      </div>
      {!isCourseConfirmed || isEditing ? (
        <>
          <input
            type="text"
            value={course_name}
            onChange={(e) => setCourse_name(e.target.value)}
            placeholder="Enter Course Name"
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <div className="flex justify-end space-x-2">
            <ThemedButton
              type="delete"
              onClick={cancelEdit}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Cancel
            </ThemedButton>
            <ThemedButton
              type="store"
              onClick={saveCourse}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Confirm
            </ThemedButton>
          </div>
        </>
      ) : (
        <div>
          {sections.map((section) => (
            <CurriculumSection
              key={section.id}
              section={section}
              updateSection={updateSection}
              deleteSection={deleteSection}
            />
          ))}
          <ThemedButton
            type="store"
            onClick={addSection}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            + Section
          </ThemedButton>
        </div>
      )}
      <ThemedButton
        type="store"
        onClick={publishCourse}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        publish
      </ThemedButton>
    </div>
  );
};

export default CurriculumCourse;
