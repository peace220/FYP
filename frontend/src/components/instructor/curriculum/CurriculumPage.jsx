import React, { useState } from "react";
import CurriculumSection from "./CurriculumSections";
const CurriculumPage = () => {
  const [sections, setSections] = useState([]);

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: `Introduction`,
      items: [],
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id, items) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, items } : section
    );
    setSections(updatedSections);
  };
  const deleteSection = (id) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Curriculum</h1>
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

export default CurriculumPage;
