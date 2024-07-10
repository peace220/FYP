import React, { useState, useEffect } from "react";
import CurriculumSection from "./CurriculumSections";

const CurriculumCourse = ({ course, updateCourse, deleteCourse }) => {
  const [sections, setSections] = useState(course.sections || []);
  const [showButton, setShowButton] = useState(false);
  const [title, setTitle] = useState("");
  const [isTitleConfirmed, setIsTitleConfirmed] = useState(!!course.title);
  const [isEditing, setIsEditing] = useState(true);

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: "",
      items: [],
    };
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    updateCourse(course.id, { ...course, Sections: updatedSections });
  };

  const updateSection = (id, updatedSection) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? updatedSection : section
    );
    setSections(updatedSections);
    updateCourse(course.id, { ...course, Sections: updatedSections });
  };

  const deleteSection = (id) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
    updateCourse(course.id, { ...course, Sections: updatedSections });
  };

  const saveTitle = () => {
    updateCourse(course.id, { ...course, title: title });
    setIsTitleConfirmed(true);
    setIsEditing(false);
  };

  const cancelTitle = () => {
    setTitle("");
    setIsTitleConfirmed(false);
  };

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  useEffect(() => {
    setTitle(course.title);
  }, [course.title]);

  return (
    <div className="border border-gray-500 p-4 mb-6">
      <div
        className="flex justify-between items-center mb-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="text-xl font-bold">Course: {` ${course.title}`}</h2>
        {showButton && isEditing == false && (
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-2 py-1 rounded mr-3"
            >
              Edit
            </button>
            <button
              onClick={() => deleteCourse(course.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {!isTitleConfirmed || isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-3 py-2 border rounded "
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={cancelTitle}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
            <button
              onClick={saveTitle}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Confirm
            </button>
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
          <button
            onClick={addSection}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            + Section
          </button>
        </div>
      )}
    </div>
  );
};

export default CurriculumCourse;
