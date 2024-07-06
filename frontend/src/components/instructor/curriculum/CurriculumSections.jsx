import React, { useState } from "react";
import CurriculumItem from "./CurriculumItem";

const CurriculumSection = ({ section, updateSection, deleteSection }) => {
  const [items, setItems] = useState(section.items || []);

  const addItem = (type) => {
    const newItem = {
      id: items.length + 1,
      type,
      title: "",
      content: "",
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    updateSection(section.id, updatedItems);
  };

  return (
    <div className="border p-4 mb-4 bg-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg mb-2">
          Section {section.id}: {section.title}
        </h2>
        <button
          onClick={() => deleteSection(section.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
      {items.map((item, index) => (
        <CurriculumItem key={index} item={item} />
      ))}
      <button
        onClick={() => addItem("lecture")}
        className="bg-blue-500 text-white px-2 py-1 rounded mt-2 mr-2"
      >
        + Lecture
      </button>
      <button
        onClick={() => addItem("quiz")}
        className="bg-green-500 text-white px-2 py-1 rounded mt-2"
      >
        + Quiz
      </button>
    </div>
  );
};

export default CurriculumSection;
