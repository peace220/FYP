import React, { useState,useEffect } from "react";
import CurriculumSection from "./CurriculumSections";

const CurriculumCourse = ({ course, updateCourse, deleteCourse }) => {
  const [sections, setSections] = useState(course.sections || []);
  const [title, setTitle] = useState("");
  const [isEditing,setIsEditing] =useState(false);
  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: "",
      items: [],
    };
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    updateCourse(course.id, updatedSections);
  };

  const updateSection = (id, items) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, items } : section
    );
    setSections(updatedSections);
    updateCourse(course.id, updatedSections);
  };

  const deleteSection = (id) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
    updateCourse(course.id, updatedSections);
  };

  const cancelTitle = () => {
    setTitle(course.title);
    setIsEditing(false);
  };
  
  useEffect(() => {
    setTitle(course.title);
  }, [course.title]);

  return (
    <div className="border border-gray-500 p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{course.title}</h2>
        <button
          onClick={() => deleteCourse(course.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete Course
        </button>
      </div>
      {sections.map((section) => (
        <CurriculumSection
          key={section.id}
          section={section}
          updateSection={updateSection}
          deleteSection={deleteSection}
        />
      ))}
      <button
        onClick={addSection}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        + Section
      </button>
    </div>
  );
};

export default CurriculumCourse;
