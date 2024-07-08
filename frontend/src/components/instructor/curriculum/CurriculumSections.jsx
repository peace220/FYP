import React, { useState } from "react";
import CurriculumItem from "./CurriculumItem";

const CurriculumSection = ({ section, updateSection, deleteSection }) => {
  const [items, setItems] = useState(section.items || []);
  const [showDelete, setShowDelete] = useState(false);
  const [lectureCount, setLectureCount] = useState(
    items.filter((item) => item.type === "lecture").length
  );
  const [quizCount, setQuizCount] = useState(
    items.filter((item) => item.type === "quiz").length
  );

  const addItem = (type) => {
    const newItem = {
      id: type === "lecture" ? lectureCount + 1 : quizCount + 1,
      type,
      title: "",
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    updateSection(section.id, updatedItems);

    if (type === "lecture") {
      setLectureCount(lectureCount + 1);
    } else if (type === "quiz") {
      setQuizCount(quizCount + 1);
    }
  };

  const updateItem = (itemId, updatedItem) => {
    const updatedItems = items.map((item) =>
      item.type === updatedItem.type && item.id === itemId ? updatedItem : item
    );
    setItems(updatedItems);
    updateSection(section.id, updatedItems);
  };

  const deleteItem = (itemId, itemType) => {
    const updatedItems = items.filter((item) => item.id !== itemId || item.type !== itemType);
    setItems(updatedItems);
    updateSection(section.id, updatedItems);

    if (itemType === "lecture") {
      setLectureCount(lectureCount - 1);
    } else if (itemType === "quiz") {
      setQuizCount(quizCount - 1);
    }
  };

  const handleMouseEnter = () => {
    setShowDelete(true);
  };

  const handleMouseLeave = () => {
    setShowDelete(false);
  };

  return (
    <div className="border border-black p-4 mb-4 bg-gray-100">
      <div
        className="flex justify-between items-center mb-4 border-b-0 border-black"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="font-bold text-lg mb-2">
          Section {section.id}: {section.title}
        </h2>
        {showDelete && (
          <button
            onClick={() => deleteSection(section.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        )}
      </div>
      {items.map((item, index) => (
        <CurriculumItem
          key={index}
          item={item}
          updateItem={updateItem}
          deleteItem={(itemId) => deleteItem(itemId, item.type)}
        />
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
